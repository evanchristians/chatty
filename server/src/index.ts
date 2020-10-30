import express from "express";
import socketio from "socket.io";
import http from "http";
import { PORT } from "./constants";
import router from "./router";
// import { addUser, removeUser, getUser, getUsersInRoom } from "./users";

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  // socket.on("join", ({ name, room }) => {
  //   const {error, user} = addUser(id: )
  // });

  socket.on("disconnect", () => {
    console.log("someone left");
  });
});

app.use(router);

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
