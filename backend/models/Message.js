const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    userName: String,
    message: String,
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
