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

  socket.on('join', function(data){

    socket.join(data.room)
    console.log(data.user + " has joined the room : " + data.room);
   
    socket.broadcast.to(data.room).emit("new user joined", { //sending the message to everyone except to the one who's sending it
      user: data.user,
      message: " has joined this room.",
    });
  });

  socket.on('leave', function(data){

    console.log(data.user + " has left the room : " + data.room);

    socket.broadcast  //socket.broadcast pentru ca toata lumea inafara de sender sa vada mesajul
      .to(data.room)
      .emit("left room", { user: data.user, message: " has left this room." });

    socket.leave(data.room);
  });

  socket.on("message", function (data) {

    console.log(data.user + " has mesage ");
    io.in(data.room).emit("new message", { //io.in ca toata lumea sa vada mesajul, inclusiv cel care trimite
      user: data.user,
      message: data.message,
    });
  });
 


});


http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
