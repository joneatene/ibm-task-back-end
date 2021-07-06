const express = require("express");
const cors = require("cors");
const Joi = require("joi");
require("dotenv").config();

const app = express();
app.use(express());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server works");
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on ${port} port`));
