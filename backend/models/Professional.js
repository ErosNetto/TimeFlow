const mongoose = require("mongoose");
const { Schema } = mongoose;

const professionalSchema = new Schema(
  {
    professionalName: String,
    servicesPerformed: Array,
    companyId: mongoose.ObjectId,
  },
  {
    timestamps: true,
  }
);

const Professional = mongoose.model("Professional", professionalSchema);

module.exports = Professional;
