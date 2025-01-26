const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

const generateToken = (username) => {
  return jwt.sign({ username }, JWT_SECRET, {
    expiresIn: "1h",
  });
};

module.exports = { generateToken };
