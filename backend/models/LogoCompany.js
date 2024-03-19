const mongoose = require("mongoose");
const { Schema } = mongoose;

const logoCompanySchema = new Schema(
  {
    image: String,
    companyId: mongoose.ObjectId,
  },
  {
    timestamps: true,
  }
);

const LogoCompany = mongoose.model("LogoCompany", logoCompanySchema);

module.exports = LogoCompany;
