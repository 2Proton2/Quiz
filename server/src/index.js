//Import Required Packages
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const {engine} = require('express-handlebars');
const config = require("./config/config");
const path = require('path')

const corsOption = {
  "origin": "http://localhost:5173",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "credentials": true
}

//Setting up express
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Setting up Mongoose
mongoose.connect(config.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

//Routes
const appRoutes = require("./routes/app.route")
app.use("/", appRoutes);

//Server Listening
app.listen(config.PORT, () => {
  console.log(`Server started on port ${config.PORT}`);
});

//Export Server
module.exports = app;
