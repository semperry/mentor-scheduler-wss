// TODO: cleanup log statements
const WebSocket = require("ws");
const express = require("express");
const PORT = process.env.PORT || 8080;

const app = express();

const server = new WebSocket.Server({
  server: app.listen(PORT, () => console.log(`listening on ${PORT}`))
});

server.on("connection", socket => {
  socket.on("message", message => {
    server.clients.forEach(client => {
      console.log(JSON.parse(message));
      client.send(message);
    });
  });

  socket.on("close", client => {
    console.log(`${client} has left`);
  });
});
