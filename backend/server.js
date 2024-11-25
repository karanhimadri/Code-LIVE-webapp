const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const PORT = 8080;

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Just for checking purpose
app.get("/", (req, res) => {
  res.send("Server is running at port 8080");
});

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// For storing rooms
const roomsDB = new Map();

io.on("connection", (socket) => {
  console.log(`A user connected & ID is :${socket.id}`);

  // Client connection validation
  socket.on("messageFromClient", (data) => {
    socket.emit("validateConnection", `✔ ${data} you are connected`);
  });

  // Create a new room
  socket.on("createRoom", (roomCode) => {
    // Generate unique 6-character room code
    roomsDB.set(roomCode, { users: [] });
    console.log(`Room created: ${roomCode}`);
  });

  // Join an existing room
  socket.on("joinRoom", (roomCode) => {
    if (roomsDB.has(roomCode)) {
      socket.join(roomCode);
      console.log(`User ${socket.id} has joined room: ${roomCode}`);
      const roomUsers = roomsDB.get(roomCode);
      roomUsers.users.push(socket.id); // Add the user to the room's user list
      // Notify the joined user
      socket.emit("isJoinSucceess", 1);
      socket.emit("countTotalUser", roomUsers.users.length);
      socket.to(roomCode).emit("countTotalUser", roomUsers.users.length);
      // Notify other users in the room that a new user joined
      socket.to(roomCode).emit("userJoined", `A new user has joined the room!`);
      console.log(`User ${socket.id} joined room: ${roomCode}`);
      console.log(roomsDB);
    } else {
      socket.emit("isJoinSucceess", 0);
      socket.emit("errorMessage", `❌ Room not found!`);
    }
  });

  socket.on("updateCode", ({ roomCode, code }) => {
    if (roomsDB.has(roomCode)) {
      // Broadcast the code update to other users in the room
      socket.to(roomCode).emit("codeUpdate", code);
      //socket.emit("codeUpdate", code);
      console.log(`Code updated in room ${roomCode}: ${code}`);
    } else {
      console.log(`Invalid room code: ${roomCode}`);
      socket.emit("error", "Invalid room code");
    }
  });

  socket.on("msgFromClient", ({ roomCode, msg }) => {
    if (roomsDB.has(roomCode)) {
      if (typeof msg === "object") {
        msg = JSON.stringify(msg); // Convert object to string if it's not already a string
      }
      socket.to(roomCode).emit("msgFromServer", msg);
    }
  });

  socket.on("leaveRoom", (roomCode) => {
    if (roomsDB.has(roomCode)) {
      // 1. check roomCode is exits in DB or not
      socket.leave(roomCode); // 2. if exist then leave the user from room
      const thisRoom = roomsDB.get(roomCode); // get users's array which associated with roomCode
      thisRoom.users = thisRoom.users.filter((id) => id !== socket.id);
      socket.emit("countTotalUser", thisRoom.users.length);
      socket.to(roomCode).emit("countTotalUser", thisRoom.users.length); // remove the user id from array
      if (thisRoom.users.length === 0) {
        // check all user are leave or not
        roomsDB.delete(roomCode); // If leave, then delete the users's array which associated with roomCode
        console.log("Room Deleted", roomCode);

        socket.emit("successMessage", "✔ So Room was Deleted !.");
      } else {
        socket.to(roomCode).emit("successMessage", "✔ A user left the room"); // notified a user left
      }
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
