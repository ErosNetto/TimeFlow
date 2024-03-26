const mongoose = require("mongoose");
const { Schema } = mongoose;

const timeSlotSchema = new Schema({
  date: Date,
  startTime: String,
  status: {
    type: String,
    default: "indisponivel",
  },
  companyId: mongoose.ObjectId,
});

const TimeSlot = mongoose.model("TimeSlot", timeSlotSchema);

module.exports = TimeSlot;

/*
 status: 'disponivel'
 status: 'indisponivel'
*/
