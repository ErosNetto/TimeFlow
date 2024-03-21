const Company = require("../models/Company");
const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET_COMPANY;
const tokenExpires = process.env.TOKEN_EXPIRES;

// Generate user token
const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: tokenExpires,
  });
};

// Register company and sing in
const register = async (req, res) => {
  const { companyName, ownerName, telephone, category, email, password } =
    req.body;

  // Verificar
  // Check if company with same name and email exists
  // const companyExists = email + " " + companyName;
  // const company = await Company.findOne({ companyExists });

  // Verificar
  // const company = await Company.findOne({ email });
  // const user = await User.findOne({ email });

  const company = await Company.findOne({ email });

  if (company) {
    res.status(422).json({ errors: ["Por favor, utilize outro e-mail."] });
    return;
  }

  // Generate password hash
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  // Create company
  const newCompany = await Company.create({
    companyName,
    ownerName,
    telephone,
    category,
    email,
    password: passwordHash,
  });

  // If company was created successfully, return the token
  if (!newCompany) {
    res
      .status(422)
      .json({ errors: ["Houve um erro, por favor tente mais tarde."] });
    return;
  }

  // Return company with token
  res.status(201).json({
    _id: newCompany._id,
    token: generateToken(newCompany._id),
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const company = await Company.findOne({ email });

  // Check if company exists
  if (!company) {
    res.status(404).json({ errors: ["Empresa não encontrado."] });
    return;
  }

  // Check if password matches
  if (!(await bcrypt.compare(password, company.password))) {
    res.status(422).json({ errors: ["Senha inválida."] });
    return;
  }

  // Return user with token
  res.status(201).json({
    _id: company._id,
    token: generateToken(company._id),
  });
};

// Get current logged in company
const getCurrentCompany = async (req, res) => {
  const company = req.company;

  res.status(200).json(company);
};

module.exports = {
  register,
  login,
  getCurrentCompany,
};
