const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

// Generate user token
const generateToken = (id) => {
  return jwt.sign(
    { id, jwtSecret },
    {
      expiresIn: process.env.TOKEN_EXPIRES,
    }
  );
};

// Register user and sign in
const register = async (req, res) => {
  res.send("Registro");
};

module.exports = {
  register,
};
