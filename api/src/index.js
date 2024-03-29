import express from 'express'
import cors from 'cors'
import http from 'http';
import { Server } from 'socket.io';

const app = express();
app.use(cors());

const server = http.Server(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})
const port = process.env.PORT || 8000;


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });

  socket.on('user connected', user => {
    io.emit('user connected', user);
  });

  console.log('user connected: ', socket.id);
  socket.on('disconnect', (reason) => {
    console.log('user disconnected: ', reason);
  });

  socket.emit("open", {} );
});

server.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});