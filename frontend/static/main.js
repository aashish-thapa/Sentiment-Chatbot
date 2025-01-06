document.getElementById("send-btn").addEventListener("click", async () => {
    const userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") return;

    const chatBox = document.getElementById("chat-box");
    const userMessage = `<div><strong>You:</strong> ${userInput}</div>`;
    chatBox.innerHTML += userMessage;

    const response = await fetch("http://127.0.0.1:5000/api/message", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userInput })
    });

    const result = await response.json();
    const botMessage = `<div><strong>Bot:</strong> ${result.response}</div>`;
    chatBox.innerHTML += botMessage;

    chatBox.scrollTop = chatBox.scrollHeight;
    document.getElementById("user-input").value = "";
});
