const mongoose = require("mongoose");
const { Schema } = mongoose;

const photoCompanySchema = new Schema(
  {
    logoImage: String,
    facadeImage: String,
    companyId: mongoose.ObjectId,
  },
  {
    timestamps: true,
  }
);

const PhotoCompany = mongoose.model("PhotoCompany", photoCompanySchema);

module.exports = PhotoCompany;