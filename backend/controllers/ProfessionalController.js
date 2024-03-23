const Professional = require("../models/Professional");
const Company = require("../models/Company");

const mongoose = require("mongoose");

const { deleteImages } = require("../utils/deleteImages");

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

  // If professional was created successfully, return data
  if (!newProfessional) {
    res.status(422).json({
      erros: ["Houve um problema, por favor tente novamente mais tarde."],
    });
    return;
  }

  res
    .status(201)
    .json({ newProfessional, message: "Profissional adicionado com sucesso!" });
};

// Remove a professional from the DB and profile photo from the backend
const deleteProfessional = async (req, res) => {
  const { id } = req.params;

  const reqCompany = req.company;

  try {
    // const professional = await Professional.findById(new mongoose.Types.ObjectId(id));
    const professional = await Professional.findById(id);

    // Check if professional exist
    if (!professional) {
      res.status(404).json({ errors: ["Profissional não encontrado!"] });
      return;
    }

    // Check if professional belongs to company
    if (!professional.companyId.equals(reqCompany._id)) {
      res.status(422).json({
        erros: ["Ocorreu um erro, por favor tente novamente mais tarde."],
      });
      return;
    }

    await Professional.findByIdAndDelete(professional._id);

    if (professional.profileImage) {
      deleteImages("professionals", professional.profileImage);
    }

    res.status(200).json({
      id: professional._id,
      message: "Profissional excluido com sucesso.",
    });
  } catch (error) {
    res.status(404).json({ errors: ["Profissional não encontrado!"] });
    return;
  }
};

module.exports = {
  insertProfessional,
  deleteProfessional,
};
