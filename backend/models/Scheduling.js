const mongoose = require("mongoose");
const { Schema } = mongoose;

const schedulingSchema = new Schema(
  {
    userName: String,
    date: Date,
    startTime: String,
    userId: mongoose.ObjectId,
    companyId: mongoose.ObjectId,
    serviceId: mongoose.ObjectId,
    professionalId: mongoose.ObjectId,
  },
  {
    timestamps: true,
  }
);

const Scheduling = mongoose.model("Scheduling", schedulingSchema);

module.exports = Scheduling;
