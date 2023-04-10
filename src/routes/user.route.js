require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

const User = require("../models/user.model");
const Blacklist = require("../models/blacklist.model");

const token_secret = process.env.TOKEN_KEY;

const app = express.Router();

// Registration Route
app.post("/register", async (req, res) => {
  let data = req.body;
  let already_exist = await User.findOne({ email: data.email });
  // If User Already Exists
  if (already_exist) {
    return res
      .status(400)
      .send({ status: false, message: "user already registered" });
  }
  //User Creation
  let hash = await argon2.hash(data.password);
  let user = await User.create({ ...data, password: hash });
  if (user) {
    return res.status(200).send({
      status: true,
      messege: "user created successfully",
    });
  } else {
    return res
      .status(400)
      .send({ status: false, messege: "something went wrong" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    // user validation
    if (user) {
      // password verification
      if (await argon2.verify(user.password, password)) {
        let bdy = {
          name: user.name,
          email: user.email,
        };

        let token = jwt.sign(bdy, token_secret, {
          expiresIn: "7 days",
        });

        res.status(200).send({ status: true, token, name:user.name });
      } else {
        return res
          .status(400)
          .send({ status: false, messege: "Wrong Password" });
      }
    } else {
      return res.status(400).send({ status: false, messege: "User not found" });
    }
  } catch (e) {
    return res.status(400).send({ status: false, messege: "User not found" });
  }
});

// Logout Route
app.post("/logout", async (req, res) => {
  let { token } = req.body;
  // blacklisting token
  try {
    let black = await Blacklist.create({ token });
    return res
      .status(200)
      .send({ status: false, messege: "User logout successfully" });
  } catch (e) {
    return res
      .status(400)
      .send({ status: false, messege: "something went wrong" });
  }
});

module.exports = app;
