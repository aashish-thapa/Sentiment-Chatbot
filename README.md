

# Sentiment Analysis Chatbot

This project features a sentiment analysis chatbot that processes user messages and returns the sentiment of the message along with a simulated chatbot response. The application uses FastAPI for the backend and React.js for the frontend.
Below are the picture of the demo(The product is not ready yet):

![image](https://github.com/user-attachments/assets/82a895a2-0419-4ab1-a30b-c1b66777f792)

![image](https://github.com/user-attachments/assets/7323b58d-c22f-4e64-8a72-72f608d335b6)

![image](https://github.com/user-attachments/assets/cdc7eaf6-7c88-4cc6-97e9-3267cb6f3cab)

## Table of Contents

- [Overview](#overview)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [Technologies Used](#technologies-used)
- [License](#license)

## Overview

This project includes:

- **Backend (FastAPI)**: Provides endpoints to analyze the sentiment of user input and simulate chatbot responses.
- **Frontend (React.js)**: Displays a chat interface where users can type a message and receive a sentiment analysis from the bot.

The application allows users to interact with a chatbot where the sentiment of their message is analyzed and the response is displayed on the chat interface.

## Backend Setup

### Requirements
- Python 3.7+
- FastAPI
- Uvicorn
- psycopg2-binary


### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/aashish-thapa/Sentiment-Chatbot.git
    cd Sentiment-Chatbot
    ```

2. Install the required dependencies:
    ```bash
    pip install -r requirements.txt
    ```

3. Start the FastAPI server:
    ```bash
    uvicorn app.main:app --reload
    ```

   This will start the server on `http://127.0.0.1:8000`.

4. Ensure your database is set up correctly and the necessary tables (like `messages`) exist. If using PostgreSQL or MySQL, ensure the user has proper permissions.

## Frontend Setup

### Requirements
- Node.js
- npm (or yarn)

### Installation

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Start the React development server:
    ```bash
    npm start
    ```

   This will start the frontend on `http://localhost:3000`.

## Running the Application

1. Ensure both the backend and frontend servers are running.
2. Navigate to `http://localhost:3000` in your browser.
3. Start chatting with the bot. Type a message and the sentiment will be analyzed and displayed in the chat.

## Technologies Used

- **Backend**: FastAPI, SQLAlchemy (or your preferred database)
- **Frontend**: React.js, Axios for API requests, React hooks for state management
- **Sentiment Analysis**: Custom sentiment analysis model (integrated with the backend)
- **Styling**: Basic CSS/Inline styles for chat interface

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to update this with specific details related to your project, like database setup instructions or any extra tools or libraries used.
