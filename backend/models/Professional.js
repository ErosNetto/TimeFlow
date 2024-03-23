const mongoose = require("mongoose");
const { Schema } = mongoose;

const professionalSchema = new Schema(
  {
    professionalName: String,
    servicesPerformed: [
      {
        type: String,
      },
    ],
    profileImage: String,
    companyId: mongoose.ObjectId,
  },
  {
    timestamps: true,
  }
);

const Professional = mongoose.model("Professional", professionalSchema);

module.exports = Professional;
