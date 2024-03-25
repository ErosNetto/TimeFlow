const Scheduling = require("../models/Scheduling");
const User = require("../models/User");
const Service = require("../models/Service");
const Professional = require("../models/Professional");
const Company = require("../models/Company");

// Scheduling for the user
const userMakeSchedule = async (req, res) => {
  const { date, time, companyId, serviceId, professionalId } = req.body;
  const reqUser = req.user;

  try {
    const user = await User.findById(reqUser._id);
    const company = await Company.findById(companyId).select("-password");
    const service = await Service.findById(serviceId);
    const professional = await Professional.findById(professionalId);

    if (!user || !company || !service || !professional) {
      res.status(404).json({ errors: ["Recurso não encontrado."] });
      return;
    }

    if (
      !service.companyId.equals(company._id) ||
      !professional.companyId.equals(company._id)
    ) {
      res.status(422).json({
        errors: [
          "O serviço ou o profissional não pertence à empresa especificada.",
        ],
      });
      return;
    }

    // Create a scheduling
    const newScheduling = await Scheduling.create({
      userName: user.userName,
      date,
      time,
      userId: user._id,
      companyId: company._id,
      serviceId: service._id,
      professionalId: professional._id,
    });

    // If scheduling was created successfully
    if (!newScheduling) {
      res
        .status(422)
        .json({ errors: ["Houve um erro, por favor tente mais tarde."] });
      return;
    }

    res
      .status(201)
      .json({ newScheduling, message: "Agendamento feito com sucesso!" });
  } catch (error) {
    res
      .status(422)
      .json({ errors: ["Houve um erro, por favor tente mais tarde."] });
    return;
  }
};

// Scheduling for the company
const companyMakeSchedule = async (req, res) => {
  const { userName, date, time, serviceId, professionalId } = req.body;
  const reqCompany = req.company;

  try {
    const company = await Company.findById(reqCompany.id).select("-password");
    const service = await Service.findById(serviceId);
    const professional = await Professional.findById(professionalId);

    if (!company || !service || !professional) {
      res.status(404).json({ errors: ["Recurso não encontrado."] });
      return;
    }

    if (
      !service.companyId.equals(company._id) ||
      !professional.companyId.equals(company._id)
    ) {
      res.status(422).json({
        errors: [
          "O serviço ou o profissional não pertence à empresa especificada.",
        ],
      });
      return;
    }

    // Create a scheduling
    const newScheduling = await Scheduling.create({
      userName,
      date,
      time,
      companyId: company._id,
      serviceId: service._id,
      professionalId: professional._id,
    });

    // If scheduling was created successfully
    if (!newScheduling) {
      res
        .status(422)
        .json({ errors: ["Houve um erro, por favor tente mais tarde."] });
      return;
    }

    res
      .status(201)
      .json({ newScheduling, message: "Agendamento feito com sucesso!" });
  } catch (error) {
    res
      .status(422)
      .json({ errors: ["Houve um erro, por favor tente mais tarde."] });
    return;
  }
};

module.exports = {
  userMakeSchedule,
  companyMakeSchedule,
};
