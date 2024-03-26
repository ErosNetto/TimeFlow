const TimeSlot = require("../models/TimeSlot");
const Company = require("../models/Company");

// Adiciona horários indisponiveis
// Added unavailable times
const insertTileSlot = async (req, res) => {
  const { date, startTime, companyId } = req.body;

  try {
    const company = await Company.findById(companyId);

    // Check if company exists
    if (!company) {
      res.status(404).json({ errors: ["Empresa não encontrado."] });
      return;
    }

    const existingTimeSlot = await TimeSlot.findOne({
      date,
      startTime,
      companyId: company._id,
    });

    if (existingTimeSlot) {
      return res.status(400).json({ error: "Esse horário está indisponivel!" });
    }

    const newTimeSlot = await TimeSlot.create({
      date,
      startTime,
      companyId: company._id,
    });

    // If timeSlot was created successfully
    if (!newTimeSlot) {
      res.status(422).json({
        erros: ["Houve um problema, por favor tente novamente mais tarde."],
      });
      return;
    }

    res
      .status(201)
      .json({ newTimeSlot, message: "Horário adicionado com sucesso!" });
  } catch (error) {
    res
      .status(422)
      .json({ errors: ["Houve um erro, por favor tente mais tarde."] });
    return;
  }
};

// Pega todos os horários do dia escolhido
// Get all time slot for day
const getAllTimeSlot = async (req, res) => {
  const { date } = req.params;

  const isValidDateFormat = /^\d{4}-\d{2}-\d{2}$/.test(date);

  if (!isValidDateFormat) {
    return res
      .status(400)
      .json({ error: "Data inválida. O formato esperado é YYYY-MM-DD." });
  }

  try {
    const timeSlots = await TimeSlot.find({ date })
      .sort({ startTime: 1 })
      .exec();

    return res.status(200).json(timeSlots);
  } catch (error) {
    console.error("Erro ao buscar horários:", error);
    return res
      .status(422)
      .json({ errors: ["Houve um erro, por favor tente mais tarde."] });
  }
};

module.exports = {
  insertTileSlot,
  getAllTimeSlot,
};
