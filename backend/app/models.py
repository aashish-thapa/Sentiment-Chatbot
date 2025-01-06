from transformers import pipeline

# Load sentiment analysis model
sentiment_analyzer = pipeline("sentiment-analysis", model="j-hartmann/emotion-english-distilroberta-base")

def analyze_sentiment(message):
    result = sentiment_analyzer(message)[0]
    return {"label": result['label'], "score": result['score']}
