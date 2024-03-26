const mongoose = require("mongoose");
const { Schema } = mongoose;

const timeSlotSchema = new Schema({
  date: Date, // Data e hora do slot
  dayOfWeek: String, // Dia da semana (ex: "Segunda-feira")
  startTime: String,
  status: String,
  companyId: mongoose.ObjectId,
});

const TimeSlot = mongoose.model("TimeSlot", timeSlotSchema);

module.exports = TimeSlot;
