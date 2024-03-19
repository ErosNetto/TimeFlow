const mongoose = require("mongoose");
const { Schema } = mongoose;

const schedulingSchema = new Schema(
  {
    date: Date,
    time: String,
    userId: mongoose.ObjectId,
    professionalId: mongoose.ObjectId,
    serviceId: mongoose.ObjectId,
    companyId: mongoose.ObjectId,
  },
  {
    timestamps: true,
  }
);

const Scheduling = mongoose.model("Scheduling", schedulingSchema);

module.exports = Scheduling;
