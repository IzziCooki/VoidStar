//Route template
const { Router } = require("express");

const routename = Router();

routename.get("/route", (req, res) => {
  res.send("stuff");
});

module.exports = routename;
