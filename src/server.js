require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const connect = require("./config/db");
const userRoute = require("./routes/user.route");
const userProfile = require("./routes/profile.route");
const bmiRoute = require("./routes/bmi.route");

const PORT = process.env.PORT;

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

app.use("/user", userRoute);
app.use("/profile", userProfile);
app.use("/bmi", bmiRoute);

app.get("/", (req, res) => {
  res.send("TeriSoft Server");
});

app.listen(PORT, async () => {
  await connect();
  console.log(`running at ${PORT}`);
});
