const mongoose = require("mongoose");
const { Schema } = mongoose;

const schedulingSchema = new Schema(
  {
    userName: String,
    date: Date,
    time: String,
    status: {
      type: String,
      default: "Ativo",
    },
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

/*
 status: 'Ativo'
 status: 'Reagendado'
 status: 'Cancelado'
*/
