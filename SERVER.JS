<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript Chatbot with API</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f2f2f2; display: flex; justify-content: center; padding-top: 50px; }
    #container { background: white; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); width: 400px; overflow: hidden; }
    #chat { height: 400px; overflow-y: auto; padding: 10px; }
    .message { margin: 5px 0; display: flex; flex-direction: column; }
    .user { align-items: flex-end; }
    .bot { align-items: flex-start; }
    .bubble { padding: 8px 12px; border-radius: 15px; max-width: 75%; }
    .user .bubble { background: #007bff; color: white; border-bottom-right-radius: 0; }
    .bot .bubble { background: #e5e5ea; border-bottom-left-radius: 0; }
    .time { font-size: 10px; color: gray; margin-top: 3px; }
    #input-area { display: flex; border-top: 1px solid #ddd; }
    #input { flex: 1; padding: 10px; border: none; outline: none; }
    #send { background: #007bff; color: white; border: none; padding: 10px 15px; cursor: pointer; }
    #send:hover { background: #0056b3; }
  </style>
</head>
<body>
  <div id="container">
    <div id="chat"></div>
    <div id="input-area">
      <input id="input" type="text" placeholder="Type a message..." autofocus />
      <button id="send">Send</button>
    </div>
  </div>

  <script>
    const chat = document.getElementById('chat');
    const input = document.getElementById('input');
    const send = document.getElementById('send');

    function appendMessage(sender, text) {
      const msgDiv = document.createElement('div');
      msgDiv.className = `message ${sender}`;
      msgDiv.innerHTML = `
        <div class="bubble">${text}</div>
        <div class="time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</div>
      `;
      chat.appendChild(msgDiv);
      chat.scrollTop = chat.scrollHeight;
    }

    async function getBotResponse(message) {
      try {
        // Show typing indicator
        const typingId = Date.now();
        appendMessage('bot', 'Typing...');
        const typingElem = chat.lastElementChild;

        // Call your API (replace URL and key)
        const response = await fetch('https://api.example.com/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': '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' // remove if not needed
          },
          body: JSON.stringify({ message })
        });

        const data = await response.json();

        // Remove typing indicator
        typingElem.remove();

        return data.reply || "Sorry, I didn't get a response.";
      } catch (error) {
        console.error(error);
        return "Error connecting to server.";
      }
    }

    async function handleSend() {
      const userText = input.value.trim();
      if (!userText) return;
      appendMessage('user', userText);
      input.value = '';

      const botReply = await getBotResponse(userText);
      appendMessage('bot', botReply);
    }

    send.addEventListener('click', handleSend);
    input.addEventListener('keypress', e => { if (e.key === 'Enter') handleSend(); });
  </script>
</body>
</html>
