from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from app.models import analyze_sentiment  # Assuming this analyzes sentiment
from app.services import save_to_db  # Assuming this saves data to the database
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai

# Configure GenerativeAI with your API key (replace with your actual key)
genai.configure(api_key="AIzaSyDBT99oF5kSSCgO8HGdOUGJZ_RecFG0U1Y")

# Initialize FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins, you can limit it to specific domains
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Define input model for validation
class MessageData(BaseModel):
    message: str

@app.get("/")
async def root():
    """Health check endpoint."""
    return {"status": "API is running", "version": "1.0.0"}

# @app.post("/analyze/")
# async def analyze_message(data: MessageData):
#     """
#     Analyze the sentiment of the given message.
#     """
#     try:
#         sentiment = analyze_sentiment(data.message)
#         save_to_db(data.message, sentiment)
#         return {"message": data.message, "sentiment": sentiment}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

@app.post("/chat/")
async def chatbot_response(data: MessageData):
    """
    Generate a chatbot response and analyze the sentiment of the user's message.
    """
    try:
        # Analyze sentiment
        sentiment = analyze_sentiment(data.message)

        # Save to the database
        save_to_db(data.message, sentiment)

        model = genai.GenerativeModel("gemini-1.5-flash")

        # Generate chatbot response using Gemini AI
        response = model.generate_content(data.message)
        
        # Validate response from Gemini AI
        if not response or not hasattr(response, "text"):
            raise ValueError("Invalid response from Gemini AI")
        
        chatbot_response = response.text

        return {
            "user_message": data.message,
            "chatbot_response": chatbot_response,
            "sentiment": sentiment,
        }
    except Exception as e:
        # Log the error for debugging purposes
        print(f"Error occurred: {e}")
        raise HTTPException(status_code=500, detail=str(e))
