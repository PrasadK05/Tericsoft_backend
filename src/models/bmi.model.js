const mongoose = require("mongoose");

let Bmi = new mongoose.Schema(
  {
    bmi_value: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
  }
);

let BMI = mongoose.model("bmi", Bmi);

module.exports = BMI;
