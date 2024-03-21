const Company = require("../../models/Company");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET_COMPANY;

const companyAuthGuard = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // Check if header has a token
  if (!token) return res.status(401).json({ errors: ["Acesso negado!"] });

  // Check if token is valid
  try {
    const verified = jwt.verify(token, jwtSecret);

    req.company = await Company.findById(verified.id).select("-password");

    next();
  } catch (error) {
    res.status(401).json({ errors: ["Token inválido."] });
  }
};

module.exports = companyAuthGuard;
