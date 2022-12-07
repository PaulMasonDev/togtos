const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = 5000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Get tvshow id

//get character list

app.listen(port, () => {
  console.log(`TOGTOS B/E listening on port ${port}`);
});
