const mongoose = require("mongoose");

let expired = new mongoose.Schema({
  token: { type: String, required: true },
});

let Blacklist = mongoose.model("blacklist", expired);

module.exports = Blacklist;
