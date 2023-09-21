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

// middleware
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/places", async (req, res) => {
  const places = await Place.find();
  res.render("places/index", { places });
});

app.get("/places/create", (req, res) => {
  res.render("places/create");
});

app.post("/places", async (req, res) => {
  const place = new Place(req.body.place);
  await place.save();
  res.redirect("/places");
});

app.get("/places/:id", async (req, res) => {
  const place = await Place.findById(req.params.id);
  res.render("places/show", { place });
});

app.listen(3000, () => {
  console.log(`server is running on http://127.0.0.1:3000`);
});
