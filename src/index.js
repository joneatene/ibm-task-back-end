const express = require("express");
const cors = require("cors");
const Joi = require("joi");
const logger = require("../config/logger");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server works");
});

app.post("/search", async (req, res) => {
  if (!req.body.keywords) {
    return res.status(400).send({ error: "Invalid data passed" });
  }
  try {
    const schema = Joi.array().max(40);
    const keyworsValidation = schema.validate(req.body.keywords);
    if (keyworsValidation.error) {
      res.status(400).send({ error: "Invalid data passed" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ error: "An error occured. Please try again later" });
  }

  try {
    await logger.log({
      level: "info",
      name: "search",
      searchKeywords: `${req.body.keywords}`,
    });

    return res.send({ status: "Search keywords logged" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ error: "An error occured. Please try again later" });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on ${port} port`));
