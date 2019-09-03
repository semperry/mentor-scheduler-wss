// TODO: cleanup log statements
const WebSocket = require("ws");
const express = require("express");

const app = express();

const server = new WebSocket.Server({
  server: app.listen(8080, () => console.log("listening on 8080"))
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
