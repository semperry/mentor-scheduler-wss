const WebSocket = require("ws");
const express = require("express");
const port = process.env.PORT || 8080;

const app = express();

const server = new WebSocket.Server({
  server: app.listen(port, () => console.log(`listening on ${port}`))
});

server.on("connection", socket => {
  console.log(`${socket} has joined`);
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
