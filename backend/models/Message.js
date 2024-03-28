const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    userName: String,
    message: {
      type: String,
      enum: ["Agendado", "Reagendado", "Cancelado"],
      required: true,
    },
    date: Date,
    startTime: String,
    reason: {
      type: String,
      maxlength: 100,
    },
    schedulingNewId: mongoose.ObjectId,
    companyId: mongoose.ObjectId,
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;

// message: {
//   "Agendado",
//   "Reagendado",
//   "Cancelado"
// }
