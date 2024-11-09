const serverURL = "https://cake-satisfying-belt.glitch.me";
const socket = io(serverURL);

document.addEventListener("DOMContentLoaded", () => {
  const usernameContainer = document.getElementById("username-container");
  const chatContainer = document.getElementById("chat-container");
  const usernameInput = document.getElementById("username-input");
  const submitUsernameBtn = document.getElementById("submit-username");
  const chatBox = document.getElementById("chat-box");
  const chatInput = document.getElementById("chat-input");

  const savedUsername = localStorage.getItem("username");
  if (savedUsername) {
    usernameContainer.style.display = "none";
    chatContainer.style.display = "block";
    connectToChat(savedUsername);
  } else {
    usernameContainer.style.display = "block";
    chatContainer.style.display = "none";

    submitUsernameBtn.addEventListener("click", () => {
      const username = usernameInput.value.trim().substring(0, 30);
      if (username) {
        localStorage.setItem("username", username);
        usernameContainer.style.display = "none";
        chatContainer.style.display = "block";
        connectToChat(username);
      }
    });
  }

  let lastMessageTime = 0;

  function connectToChat(username) {
    socket.on("connect", () => {
      chatBox.innerHTML += "Connected...\n";
      chatInput.disabled = false;

      socket.on("chat message", (msg) => {
        typeMessage(msg);
      });

      chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter" && chatInput.value.trim() !== "") {
          const currentTime = Date.now();
          const timeDiff = currentTime - lastMessageTime;

          if (timeDiff < 300) {
            return;
          }

          const message = `${username}: ${chatInput.value}`;
          socket.emit("chat message", message);
          chatInput.value = "";
          lastMessageTime = currentTime;
        }
      });
    });

    socket.on("connect_error", () => {
      chatBox.innerHTML += "\nFailed to connect. Retrying...\n";
    });
  }

  function typeMessage(message) {
    const messageElement = document.createElement("div");
  
    if (message === "Stop spamming bitch, Otherwise i will be forced to DDoX your ass.") {
      messageElement.style.color = "#ff0000";
    }
  
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    
    chatBox.scrollTop = chatBox.scrollHeight;
  }
});
