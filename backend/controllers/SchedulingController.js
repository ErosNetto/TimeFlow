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

// Get all user schedules
const getUserSchedules = async (req, res) => {
  const reqUser = req.user;

  try {
    const userSchedules = await Scheduling.find({ userId: reqUser._id })
      .sort([["createdAt", -1]])
      .exec();

    if (userSchedules.length === 0) {
      return res.status(200).json({
        userSchedules,
        message: "Você não possui nenhum agendamento!",
      });
    }

    return res.status(200).json(userSchedules);
  } catch (error) {
    console.error("Erro ao buscar serviços da empresa:", error);
    return res
      .status(422)
      .json({ errors: ["Houve um erro, por favor tente mais tarde."] });
  }
};

// Rescheduling for the user
const userMakeRescheduling = async (req, res) => {
  const { id } = req.params;
  const { date, time } = req.body;
  const reqUser = req.user;

  try {
    const scheduling = await Scheduling.findById(id);

    // Check if scheduling exists
    if (!scheduling) {
      res.status(404).json({ errors: ["Agendamento não encontrado!"] });
      return;
    }

    // Check if scheduling belongs to user
    if (!scheduling.userId.equals(reqUser._id)) {
      res.status(422).json({
        erros: ["Ocorreu um erro, por favor tente novamente mais tarde."],
      });
      return;
    }

    if (scheduling.status) {
      scheduling.status = "Reagendado";
    }

    // Create a new scheduling
    const newScheduling = await Scheduling.create({
      userName: scheduling.userName,
      date,
      time,
      userId: reqUser._id,
      companyId: scheduling.companyId,
      serviceId: scheduling.serviceId,
      professionalId: scheduling.professionalId,
    });

    // If new scheduling was created successfully
    if (!newScheduling) {
      res
        .status(422)
        .json({ errors: ["Houve um erro, por favor tente mais tarde."] });
      return;
    }

    await scheduling.save();

    res
      .status(201)
      .json({ newScheduling, message: "Reagendamento feito com sucesso!" });
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

// Get all company schedules
const getCompanySchedules = async (req, res) => {
  const reqCompany = req.company;

  try {
    const companySchedules = await Scheduling.find({
      companyId: reqCompany._id,
    })
      .sort([["createdAt", -1]])
      .exec();

    if (companySchedules.length === 0) {
      return res.status(200).json({
        companySchedules,
        message: "Sua empresa não possui nenhum agendamento!",
      });
    }

    return res.status(200).json(companySchedules);
  } catch (error) {
    console.error("Erro ao buscar serviços da empresa:", error);
    return res
      .status(422)
      .json({ errors: ["Houve um erro, por favor tente mais tarde."] });
  }
};

// Get schedules of user by id
const getSchedulesById = async (req, res) => {
  const { id } = req.params;

  try {
    const schedules = await Scheduling.findById(id);

    // Check if professional exists
    if (!schedules) {
      res.status(404).json({ errors: ["Agendamento não encontrado."] });
      return;
    }

    return res.status(200).json(schedules);
  } catch (error) {
    res.status(404).json({ errors: ["Agendamento não encontrado."] });
    return;
  }
};

module.exports = {
  userMakeSchedule,
  getUserSchedules,
  userMakeRescheduling,
  companyMakeSchedule,
  getCompanySchedules,
  getSchedulesById,
};
