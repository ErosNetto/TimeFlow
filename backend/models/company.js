const mongoose = require("mongoose");
const { Schema } = mongoose;

const companySchema = new Schema(
  {
    companyName: String,
    ownerName: String,
    email: String,
    password: String,
    telephone: String,
    address: String,
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
