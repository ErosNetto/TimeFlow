const User = require("../models/User");
const Company = require("../models/Company");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const authGuard = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // Check if header has a token
  if (!token) return res.status(401).json({ errors: ["Acesso negado!"] });

  // Check if token is valid
  try {
    const verified = jwt.verify(token, jwtSecret);

    // Check if verified.id is a user id or company id
    if (verified.type === "user") {
      req.user = await User.findById(verified.id).select("-password");
    } else if (verified.type === "company") {
      req.company = await Company.findById(verified.id).select("-password");
    } else {
      return res
        .status(401)
        .json({ errors: ["Tipo de usuário inválido no token."] });
    }

    next();
  } catch (error) {
    res.status(401).json({ errors: ["Token inválido."] });
  }
};

module.exports = authGuard;
