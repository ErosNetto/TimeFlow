const express = require("express");
const router = express.Router();

// Controller
const {
  getAllMessage,
  getMessageById,
  deleteMessage,
} = require("../controllers/MessageController");

// Middlewares
const authGuard = require("../middlewares/authGuard");

// Router
router.get("/", authGuard, getAllMessage);
router.get("/:id", authGuard, getMessageById);
router.delete("/:id", authGuard, deleteMessage);

module.exports = router;
