const mongoose = require("mongoose");
const { Screma } = mongoose;

const userSchema = new Screma(
  {
    name: String,
    email: String,
    password: String,
    telephone: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
