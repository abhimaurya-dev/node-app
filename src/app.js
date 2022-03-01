const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// console.log(__dirname);
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
app.use(express.static(publicDirectoryPath));

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    createdBy: "Abhishek",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    createdBy: "Abhishek",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    createdBy: "Abhishek",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a address",
    });
  }
  geocode(req.query.address, (error, { latitude, longitude } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        address: req.query.address,
      });
    });
  });
});

app.listen(3000, () => {
  console.log("Server is online at 3000");
});
