const Professional = require("../models/Professional");
const Company = require("../models/Company");

// const mongoose = require("mongoose");

const { deleteImages } = require("../utils/deleteImages");

// Create a professional, with an company related to it
const insertProfessional = async (req, res) => {
  const { professionalName, servicesPerformed } = req.body;

  try {
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
      if (req.file) {
        await deleteImages("professionals", req.file.filename);
      }
      res.status(422).json({
        erros: ["Houve um problema, por favor tente novamente mais tarde."],
      });
      return;
    }

    res.status(201).json({
      newProfessional,
      message: "Profissional adicionado com sucesso!",
    });
  } catch (error) {
    if (req.file) {
      await deleteImages("professionals", req.file.filename);
    }
    console.error(error);
    res.status(500).send("Erro ao criar um profissional.");
  }
};

// Update a service and profile photo from the backend
const updateProfissional = async (req, res) => {
  try {
    const { id } = req.params;
    const { professionalName, servicesPerformed } = req.body;

    const reqCompany = req.company;

    let newProfileImage;
    let profileImageOld;

    if (req.file) {
      newProfileImage = req.file.filename;
    }

    const professional = await Professional.findById(id);

    // Check if professional exists
    if (!professional) {
      if (newProfileImage) {
        await deleteImages("professionals", newProfileImage);
      }
      res.status(404).json({ errors: ["Profissional não encontrado!"] });
      return;
    }

    // Check if professional belongs to company
    if (!professional.companyId.equals(reqCompany._id)) {
      if (newProfileImage) {
        await deleteImages("professionals", newProfileImage);
      }
      res.status(422).json({
        erros: ["Ocorreu um erro, por favor tente novamente mais tarde."],
      });
      return;
    }

    if (professionalName) {
      professional.professionalName = professionalName;
    }

    if (servicesPerformed) {
      professional.servicesPerformed = servicesPerformed;
    }

    if (newProfileImage) {
      if (professional.profileImage) {
        profileImageOld = professional.profileImage;
      }
      professional.profileImage = newProfileImage;
    }

    await professional.save();

    if (newProfileImage) {
      if (profileImageOld) {
        await deleteImages("professionals", profileImageOld);
      }
    }

    res.status(200).json({ professional, message: "Atualizado com sucesso!" });
  } catch (error) {
    if (req.file) {
      await deleteImages("professionals", req.file.filename);
    }
    console.error(error);
    res.status(500).send("Erro ao editar o profissional.");
  }
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

// Get professionalo of company by id
const gelProfessionalById = async (req, res) => {
  const { id } = req.params;

  try {
    const professional = await Professional.findById(id);

    // Check if professional exists
    if (!professional) {
      res.status(404).json({ errors: ["Profissional não encontrado."] });
      return;
    }

    return res.status(200).json(professional);
  } catch (error) {
    res.status(404).json({ errors: ["Profissional não encontrado."] });
    return;
  }
};

//  Get all professionals of company
const gelCompanyProfessionals = async (req, res) => {
  const reqCompany = req.company;

  if (!reqCompany) {
    return res.status(404).json({ message: "Empresa não encontrada" });
  }

  try {
    const companyProfessionals = await Professional.find({
      companyId: reqCompany._id,
    })
      .sort([["createdAt", -1]])
      .exec();

    if (companyProfessionals.length === 0) {
      return res.status(200).json({
        companyProfessionals,
        message: "Sua empresa não possui nenhum profissional cadastrado!",
      });
    }

    return res.status(200).json(companyProfessionals);
  } catch (error) {
    console.error("Erro ao buscar serviços da empresa:", error);
    return res
      .status(422)
      .json({ errors: ["Houve um erro, por favor tente mais tarde."] });
  }
};

module.exports = {
  insertProfessional,
  updateProfissional,
  deleteProfessional,
  gelProfessionalById,
  gelCompanyProfessionals,
};
