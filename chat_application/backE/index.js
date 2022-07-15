const express = require("express");
const { Server } = require("socket.io");
var http = require("http");
const cors = require("cors");

// Initialize express() with app.
const app = express();
// We are continuous using cors when we use app.
//Simple Usage (Enable All CORS Requests)
app.use(cors());
const server = http.createServer(app);

//given:  Initialize Socket.io on server
//  application(3000) and server(9000) serve on differ port
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("Connection establish from Server.....");
  res.end();
});
//======================== Server-side connection  ================
io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("joinRoom", (room) => {
    // Join user in this room.
    socket.join(room);
  });

  socket.on("newMessage", ({ newMessage, room }) => {
    //Send message to all user which connected to same group by using  io.in(room).emit("getLatestMessage", newMessage);
    io.in(room).emit("getLatestMessage", newMessage);
  });
});
// Run server on Port 9000.
const port = process.env.PORT || 9000;
server.listen(port, console.log(`App started at port ${port} `));
