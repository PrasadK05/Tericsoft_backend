require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const verifyToken = require("../middlewares/auth.middleware");

const token_secret = process.env.TOKEN_KEY;

const app = express.Router();

// middlewares
app.use(verifyToken);

app.get("/getProfile", async (req, res) => {
  let { token } = req.headers;
  let decode = jwt.decode(token, token_secret);
  try {
    let get = await User.findOne(
      { email: decode.email },
      { email: 1, name: 1 }
    );
    return res.status(200).send({
      status: true,
      result: get,
    });
  } catch (error) {
    return res.status(400).send({ status: false, messege: "bad request" });
  }
});

module.exports = app;
