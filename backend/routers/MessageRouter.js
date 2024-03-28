const express = require("express");
const router = express.Router();

// Controller
const { deleteMessage } = require("../controllers/MessageController");

// Middlewares
const authGuard = require("../middlewares/authGuard");

// Router
router.delete("/:id", authGuard, deleteMessage);

module.exports = router;
