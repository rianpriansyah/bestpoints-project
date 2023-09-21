// "C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" --dbpath="c:\data\db"

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

// models
const Place = require("./models/place");

// connect to mongodb
mongoose
  .connect("mongodb://127.0.0.1/bestpoints")
  .then((result) => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => {
  console.log(`server is running on http://127.0.0.1:3000`);
});
