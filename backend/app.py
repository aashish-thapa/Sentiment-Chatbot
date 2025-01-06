from flask import Flask, request, jsonify
from flask_cors import CORS
from sentiment_model import analyze_sentiment

app = Flask(__name__)
CORS(app)
@app.route('/api/message', methods = ['POST'])

def process_message():
    user_message = request.json.get('message', '')
    sentiment = analyze_sentiment(user_message)
    response = f"The sentiment of your message is {sentiment}."
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True)