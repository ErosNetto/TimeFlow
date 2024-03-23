const Company = require("../models/Company");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// const mongoose = require("mongoose");

const { deleteImages } = require("../utils/deleteImages");

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

// Update an company
const update = async (req, res) => {
  try {
    const {
      companyName,
      ownerName,
      telephone,
      category,
      schedules,
      address,
      password,
    } = req.body;

    const reqCompany = req.company;

    let newLogoImage;
    let newFacadeImage;
    let logoImageOld;
    let facadeImageOld;

    if (req.files) {
      if (req.files.logoImage) {
        newLogoImage = req.files.logoImage[0].filename;
      }

      if (req.files.facadeImage) {
        newFacadeImage = req.files.facadeImage[0].filename;
      }
    }

    const company = await Company.findById(reqCompany._id).select("-password");

    if (companyName) {
      company.companyName = companyName;
    }

    if (ownerName) {
      company.ownerName = ownerName;
    }

    if (telephone) {
      company.telephone = telephone;
    }

    if (category) {
      company.category = category;
    }

    if (schedules) {
      company.schedules = schedules;
    }

    if (address) {
      company.address = address;
    }

    if (newLogoImage) {
      if (company.logoImage) {
        logoImageOld = company.logoImage;
      }
      company.logoImage = newLogoImage;
    }

    if (newFacadeImage) {
      if (company.facadeImage) {
        facadeImageOld = company.facadeImage;
      }
      company.facadeImage = newFacadeImage;
    }

    if (password) {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      company.password = passwordHash;
    }

    await company.save();

    if (newLogoImage) {
      if (logoImageOld) {
        await deleteImages("company", logoImageOld);
      }
    }

    if (newFacadeImage) {
      if (facadeImageOld) {
        await deleteImages("company", facadeImageOld);
      }
    }

    res.status(200).json({ company, message: "Atualizado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao editar o perfil.");
  }
};

// Get company by id
const getCompanyById = async (req, res) => {
  const { id } = req.params;

  try {
    const company = await Company.findById(id).select("-password");

    // Check if company exists
    if (!company) {
      res.status(404).json({ errors: ["Empresa não encontrado."] });
      return;
    }

    return res.status(200).json(company);
  } catch (error) {
    res.status(404).json({ errors: ["Empresa não encontrado."] });
    return;
  }
};

// Get all company
const getAllCompanies = async (req, res) => {
  const companies = await Company.find({})
    .select("-password -email -ownerName -telephone")
    .sort({ createdAt: -1 })
    .exec();

  return res.status(200).json(companies);
};

module.exports = {
  register,
  login,
  getCurrentCompany,
  update,
  getCompanyById,
  getAllCompanies,
};
