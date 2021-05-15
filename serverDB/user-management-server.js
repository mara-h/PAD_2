//const mongoose = require('mongoose');
const express = require('express');
const app = express();
const morgan = require("morgan");
const userRoutes = require("./api/routes/user");
const db = require("./connection");
const cors = require('cors');
const bodyParser = require('body-parser');
const bearerToken = require('express-bearer-token');

const PORT = process.env.PORT || 3000;
var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/user", userRoutes);


app.get("/", (req, res) => {
  res.json({ message: "Welcome to language application." });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
