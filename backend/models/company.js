const mongoose = require("mongoose");
const { Schema } = mongoose;

const companySchema = new Schema({
  name: String,
  email: String,
  password: String,
  telephone: String,
  address: String,
});
