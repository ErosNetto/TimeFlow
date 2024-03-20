const mongoose = require("mongoose");
const { Schema } = mongoose;

const companySchema = new Schema(
  {
    companyName: String,
    ownerName: String,
    telephone: String,
    category: String,
    address: Object,
    email: String,
    password: String,
    // companyExists: String,
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model("Company", companySchema);

module.exports = Company;

/*
address {
  road: 'String',
  district: 'String',
  city: 'String',
  state: 'String',
  zipCode: 'String',
}
*/
