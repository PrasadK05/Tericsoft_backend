const jwt = require("jsonwebtoken");
const Blacklist = require("../models/blacklist.model");
const token_secret = process.env.TOKEN_KEY;

// Middleware for token verification

const verifyToken = async function (req, res, next) {
  const token = req.headers.token;
  // If token is unavialable,
  if (!token) {
    return res.status(403).send("Unauthorized");
  }

  // If token found in blacklist
  try {
    let blacklist = await Blacklist.findOne({ token });
    if (blacklist) {
      return res.status(403).send("Unauthorized");
    }
  } catch (error) {
    return res.status(403).send(e.message);
  }

  try {
    const verification = await jwt.verify(token, token_secret);
    if (verification) {
      next();
    } else {
      return res.status(401).send("Operation not allowed.");
    }
  } catch (e) {
    return res.status(403).send(e.message);
  }
};

module.exports = verifyToken;
