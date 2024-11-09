const socket = io('https://cake-satisfying-belt.glitch.me');

const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');

chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && chatInput.value) {
    socket.emit('chat message', chatInput.value);
    chatInput.value = '';
  }
});

socket.on('chat message', (msg) => {
  const messageElement = document.createElement('div');
  messageElement.textContent = msg;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
});
