import React, { useState } from 'react';
import axios from 'axios';

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const newMessage = { user: "You", text: input };
    setMessages([...messages, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/chat/", {
        message: input,
      });
      console.log("API Response:", response.data); // Log the full response from the API

      // Check if the response is structured as expected
      if (response.data && response.data.sentiment && response.data.chatbot_response) {
        // Sentiment message
        const sentimentMessage = {
          user: "Bot",
          text: `Sentiment: ${response.data.sentiment.label}, Score: ${response.data.sentiment.score.toFixed(2) * 100}%`,
        };

        // Chatbot (Gemini) response message
        const chatbotResponse = {
          user: "Bot",
          text: response.data.chatbot_response,
        };

        setMessages((prevMessages) => [
          ...prevMessages,
          sentimentMessage,
          chatbotResponse,
        ]);
      } else {
        console.error("Invalid response structure");
        setMessages((prevMessages) => [
          ...prevMessages,
          { user: "Bot", text: "Sorry, I couldn't process that." },
        ]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = { user: "Bot", text: "Sorry, I couldn't process that." };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatWindow}>
        {messages.map((msg, index) => (
          <div key={index}>
            <div style={msg.user === "You" ? styles.userMessage : styles.botMessage}>
              <strong>{msg.user}:</strong> {msg.text}
            </div>
          </div>
        ))}
        {loading && <div style={styles.botMessage}><strong>Bot:</strong> Thinking...</div>}
      </div>

      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button style={styles.sendButton} onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '20px auto',
  },
  chatWindow: {
    height: '400px',
    width: '100%',
    overflowY: 'scroll',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  userMessage: {
    textAlign: 'right',
    marginBottom: '10px',
    padding: '8px 12px',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '10px',
    maxWidth: '80%',
    marginLeft: 'auto',
  },
  botMessage: {
    textAlign: 'left',
    marginBottom: '10px',
    padding: '8px 12px',
    backgroundColor: '#f1f1f1',
    color: '#333',
    borderRadius: '10px',
    maxWidth: '80%',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    fontSize: '16px',
    marginRight: '10px',
  },
  sendButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '16px',
  }
};

export default ChatBox;
