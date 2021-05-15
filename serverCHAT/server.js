const express = require('express');
const app = express(); 
const PORT= 8080 || process.env.PORT;

const http = require("http").createServer(app);
const io = require("socket.io")(http,{
  cors: {
    origin:"*",
  },
});



// SOCKET IO CONNECTION
app.get("/", (res, req) => {
  res.sendFile(process.env.CHAT_BASE + "/chat");
  console.log(process.env.CHAT_BASE + "/chat");
});



io.on("connection", function (socket) { //how the server handles a connection event

  console.log('New WS connection..'); 

});


http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
  