const express = require('express');
const app = express(); 
const PORT= 8080 || process.env.PORT;

const http = require("http").createServer(app);
const io = require("socket.io")(http,{
  cors: {
    origin:"*",
  },
});

http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
  