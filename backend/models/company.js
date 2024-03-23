const mongoose = require("mongoose");
const { Schema } = mongoose;

const companySchema = new Schema(
  {
    companyName: String,
    ownerName: String,
    telephone: String,
    category: String,
    schedules: {
      type: Object,
      default: {
        Domingo: String,
        SegundaFeira: String,
        TerçaFeira: String,
        QuartaFeira: String,
        QuintaFeira: String,
        SextaFeira: String,
        Sábado: String,
      },
    },
    address: {
      type: Object,
      default: {
        road: String,
        district: String,
        city: String,
        state: String,
        zipCode: Number,
      },
    },
    logoImage: String,
    facadeImage: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model("Company", companySchema);

module.exports = Company;

/*
schedules = {
  Domingo: "Fechado",
  SegundaFeira: "10:00 - 19:00",
  TerçaFeira: "10:00 - 19:00",
  QuartaFeira: "10:00 - 19:00",
  QuintaFeira: "10:00 - 19:00",
  SextaFeira: "10:00 - 19:00",
  Sábado: "10:00 - 17:00",
};

address {
  road: 'String',
  district: 'String',
  city: 'String',
  state: 'String',
  zipCode: 'String',
}
*/
