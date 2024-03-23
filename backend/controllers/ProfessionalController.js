const Professional = require("../models/Professional");
const Company = require("../models/Company");

const mongoose = require("mongoose");

// Create a professional, with an company related to it
const insertProfessional = async (req, res) => {
  const { professionalName, servicesPerformed } = req.body;
  const profileImage = req.file.filename;

  const reqCompany = req.company;

  const company = await Company.findById(reqCompany.id);

  // Create a professional
  const newProfessional = await Professional.create({
    professionalName,
    servicesPerformed,
    profileImage,
    companyId: company._id,
  });

  // If user was created successfully, return data
  if (!newProfessional) {
    res.status(422).json({
      erros: ["Houve um problema, por favor tente novamente mais tarde."],
    });
  }

  res
    .status(201)
    .json({ newProfessional, message: "Profissional adicionado com sucesso!" });
};

module.exports = {
  insertProfessional,
};
