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

app.post("/search", async (req, res) => {
  if (!req.body.keywords) {
    return res.status(400).send({ error: "Incorrect data passed" });
  }

  try {
    const schema = Joi.array().max(40);
    const keywordsValidation = schema.validate($req.body.keywords);

    if (keywordsValidation.error) {
      return res.status(400).send({ error: "Incorrect data passed" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ error: "An error occured. Please try again later" });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on ${port} port`));
