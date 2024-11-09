const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');  // Import cors

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "https://c0d3inject0r.github.io", // Allow your GitHub Pages domain
    methods: ["GET", "POST"]
  }
});

// Enable CORS for the entire Express app
app.use(cors({
  origin: "https://c0d3inject0r.github.io" // Set GitHub Pages as allowed origin
}));

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Handle chat message
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
