const Service = require("../models/Service");
const Company = require("../models/Company");

const mongoose = require("mongoose");

// Create a service, with an company related to it
const insertService = async (req, res) => {
  const { serviceName, price, time } = req.body;

  const reqCompany = req.company;

  const company = await Company.findById(reqCompany.id);

  // Create a service
  const newService = await Service.create({
    serviceName,
    price,
    time,
    companyId: company._id,
  });

  // If service was created successfully, return data
  if (!newService) {
    res.status(422).json({
      erros: ["Houve um problema, por favor tente novamente mais tarde."],
    });
  }

  res.status(201).json({ newService, message: "Serviço criado com sucesso!" });
};

module.exports = {
  insertService,
};
