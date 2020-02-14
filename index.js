const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "public"));

io.on("connection", function(socket) {
  console.log("made socket connection", socket.id);

  socket.on("submit", function(data) {
    io.sockets.emit("submit", data);
  });

  socket.on("type", function(data) {
    socket.broadcast.emit("type", data);
  });
});

server.listen(4000);
