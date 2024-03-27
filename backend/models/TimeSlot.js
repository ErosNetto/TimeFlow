const mongoose = require("mongoose");
const { Schema } = mongoose;

const timeSlotSchema = new Schema({
  date: Date,
  startTime: String,
  companyId: mongoose.ObjectId,
  professionalId: mongoose.ObjectId,
});

const TimeSlot = mongoose.model("TimeSlot", timeSlotSchema);

module.exports = TimeSlot;
