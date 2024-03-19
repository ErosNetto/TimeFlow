const mongoose = require("mongoose");
const { Schema } = mongoose;

const photoProfessionalSchema = new Schema(
  {
    image: String,
    professionalId: mongoose.ObjectId,
  },
  {
    timestamps: true,
  }
);

const PhotoProfessional = mongoose.model(
  "PhotoProfessional",
  photoProfessionalSchema
);

module.exports = PhotoProfessional;
