from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from app.models import analyze_sentiment
from app.services import save_to_db
from fastapi.middleware.cors import CORSMiddleware
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

@app.post("/analyze/")
async def analyze_message(data: MessageData):
    """
    Analyze the sentiment of the given message.
    """
    try:
        sentiment = analyze_sentiment(data.message)
        save_to_db(data.message, sentiment)
        return {"message": data.message, "sentiment": sentiment}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/chat/")
async def chatbot_response(data: MessageData):
    """
    Simulate a chatbot response and analyze the sentiment of the user's message.
    """
    try:
        # Simulate a chatbot response
        chatbot_response = f"Chatbot says: I understand '{data.message}'"
        
        # Analyze sentiment
        sentiment = analyze_sentiment(data.message)
        
        # Save to the database
        save_to_db(data.message, sentiment)
        
        return {
            "user_message": data.message,
            "chatbot_response": chatbot_response,
            "sentiment": sentiment,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
