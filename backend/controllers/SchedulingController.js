const Scheduling = require("../models/Scheduling");
const TimeSlot = require("../models/TimeSlot");
const User = require("../models/User");
const Service = require("../models/Service");
const Professional = require("../models/Professional");
const Company = require("../models/Company");

// Scheduling for the user
const userMakeSchedule = async (req, res) => {
  const { date, startTime, companyId, serviceId, professionalId } = req.body;
  const reqUser = req.user;

  try {
    const user = await User.findById(reqUser._id);
    const company = await Company.findById(companyId).select("-password");
    const professional = await Professional.findById(professionalId);

    if (!user || !company || !professional) {
      res.status(404).json({ errors: ["Recurso não encontrado."] });
      return;
    }

    if (!professional.companyId.equals(company._id)) {
      res.status(422).json({
        errors: ["O profissional não pertence à empresa especificada."],
      });
      return;
    }

    const existingTimeSlot = await TimeSlot.findOne({
      date,
      startTime,
      companyId: company._id,
      professionalId: professional._id,
    });

    if (existingTimeSlot) {
      return res.status(400).json({ error: "Esse horário está indisponivel!" });
    }

    const service = await Service.findById(serviceId);

    if (!service) {
      res.status(404).json({ errors: ["Serviço não encontrado."] });
      return;
    }

    if (!service.companyId.equals(company._id)) {
      res.status(422).json({
        errors: ["O serviço não pertence à empresa especificada."],
      });
      return;
    }

    // Create a timeSlot
    const newTimeSlot = await TimeSlot.create({
      date,
      startTime,
      companyId: company._id,
      professionalId: professional._id,
    });

    // Create a scheduling
    const newScheduling = await Scheduling.create({
      userName: user.userName,
      date,
      startTime,
      userId: user._id,
      companyId: company._id,
      serviceId: service._id,
      professionalId: professional._id,
    });

    // If scheduling or timeSlot was created successfully
    if (!newTimeSlot || !newScheduling) {
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

    await Scheduling.findByIdAndDelete(id);

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
  const { userName, date, startTime, serviceId, professionalId } = req.body;
  const reqCompany = req.company;

  try {
    const company = await Company.findById(reqCompany.id).select("-password");
    const professional = await Professional.findById(professionalId);

    if (!company || !professional) {
      res.status(404).json({ errors: ["Recurso não encontrado."] });
      return;
    }

    if (!professional.companyId.equals(company._id)) {
      res.status(422).json({
        errors: ["O profissional não pertence à empresa especificada."],
      });
      return;
    }

    const existingTimeSlot = await TimeSlot.findOne({
      date,
      startTime,
      companyId: company._id,
      professionalId: professional._id,
    });

    if (existingTimeSlot) {
      return res.status(400).json({ error: "Esse horário está indisponivel!" });
    }

    const service = await Service.findById(serviceId);

    if (!service) {
      res.status(404).json({ errors: ["Serviço não encontrado."] });
      return;
    }

    if (!service.companyId.equals(company._id)) {
      res.status(422).json({
        errors: ["O serviço não pertence à empresa especificada."],
      });
      return;
    }

    // Create a timeSlot
    const newTimeSlot = await TimeSlot.create({
      date,
      startTime,
      companyId: company._id,
      professionalId: professional._id,
    });

    // Create a scheduling
    const newScheduling = await Scheduling.create({
      userName,
      date,
      time,
      companyId: company._id,
      serviceId: service._id,
      professionalId: professional._id,
    });

    // If scheduling or timeSlot was created successfully
    if (!newTimeSlot || !newScheduling) {
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

// Rescheduling for the company
const companyMakeRescheduling = async (req, res) => {
  const { id } = req.params;
  const { date, time } = req.body;
  const reqCompany = req.company;

  try {
    const scheduling = await Scheduling.findById(id);

    // Check if scheduling exists
    if (!scheduling) {
      res.status(404).json({ errors: ["Agendamento não encontrado!"] });
      return;
    }

    // Check if scheduling belongs to user
    if (!scheduling.companyId.equals(reqCompany._id)) {
      res.status(422).json({
        erros: ["Ocorreu um erro, por favor tente novamente mais tarde."],
      });
      return;
    }

    // Create a new scheduling
    const newScheduling = await Scheduling.create({
      userName: scheduling.userName,
      date,
      time,
      userId: scheduling._id,
      companyId: reqCompany._id,
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

    await Scheduling.findByIdAndDelete(id);

    res
      .status(201)
      .json({ newScheduling, message: "Reagendamento feito com sucesso!" });
  } catch (error) {
    console.log(error);
    res
      .status(422)
      .json({ errors: ["Houve um erro, por favor tente mais tarde."] });
    return;
  }
};

// Get all schedules for company or user
const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Scheduling.find({
      $or: [
        req.company ? { companyId: req.company._id } : { userId: req.user._id },
      ],
    })
      .sort([["createdAt", -1]])
      .exec();

    if (schedules.length === 0) {
      return res.status(200).json({
        schedules,
        message: req.company
          ? "Sua empresa não possui nenhum agendamento!"
          : "Você não possui nenhum agendamento!",
      });
    }

    return res.status(200).json(schedules);
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
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

// Cancel schedules
const cancelSchedules = async (req, res) => {
  const { id } = req.params;

  try {
    const schedules = await Scheduling.findById(id);

    // Check if service exist
    if (!schedules) {
      res.status(404).json({ errors: ["Agendamento não encontrado!"] });
      return;
    }

    // Check if schedules belongs to company or user
    if (req.user) {
      if (!schedules.userId.equals(req.user._id)) {
        res.status(422).json({
          erros: ["Ocorreu um erro, por favor tente novamente mais tarde."],
        });
        return;
      }
    } else {
      if (!schedules.companyId.equals(req.company._id)) {
        res.status(422).json({
          erros: ["Ocorreu um erro, por favor tente novamente mais tarde."],
        });
        return;
      }
    }

    await Scheduling.findByIdAndDelete(schedules._id);

    res.status(200).json({
      id: schedules._id,
      message: "Agendamento excluido com sucesso.",
    });
  } catch (error) {
    res.status(404).json({ errors: ["Agendamento não encontrado!"] });
    return;
  }
};

module.exports = {
  userMakeSchedule,
  userMakeRescheduling,
  companyMakeSchedule,
  companyMakeRescheduling,
  getAllSchedules,
  getSchedulesById,
  cancelSchedules,
};

/*
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
*/
