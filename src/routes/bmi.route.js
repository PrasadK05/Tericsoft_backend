require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const BMI = require("../models/bmi.model");
const verifyToken = require("../middlewares/auth.middleware");

const token_secret = process.env.TOKEN_KEY;

const app = express.Router();

// middlewares
app.use(verifyToken);

// BMI Calculation Route
app.post("/calculateBMI", async (req, res) => {
  let { weight, height } = req.body;
  let { token } = req.headers;
  let decode = jwt.decode(token, token_secret);

  weight = Number(weight);
  height = Number(height);

  // mbi calculation
  let calculation = weight / height ** 2;
  calculation = Number.parseFloat(calculation).toFixed(2);
  calculation = Number(calculation);

  try {
    // finding user
    let user = await User.findOne({ email: decode.email });
    // bmi cration
    let bmi = await BMI.create({ bmi_value: calculation, user: user._id });
    // updating bmi history
    let update = await User.findByIdAndUpdate(
      { _id: user._id },
      { $push: { bmi_history: bmi._id } }
    );

    return res.status(200).send({
      status: true,
      result: calculation,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ status: false, messege: "Something went wrong" });
  }
});

// Get BMI History Route
app.get("/getCalculationHistory", async (req, res) => {
  let { token } = req.headers;
  let decode = jwt.decode(token, token_secret);

  try {
    // getting bmi history
    let history = await User.findOne({ email: decode.email }).populate(
      "bmi_history",
      { bmi_value: 1, createdAt: 1 }
    );

    return res.status(200).send({
      status: true,
      result: history.bmi_history,
    });
  } catch (error) {
    return res
      .status(400)
      .send({ status: false, messege: "Something went wrong" });
  }
});

module.exports = app;
