const express = require("express");
const router = express.Router();

// Controller
const {
  getAllTimeSlot,
  insertTileSlot,
} = require("../controllers/TimeSlotController");

// Middlewares
const validate = require("../middlewares/handleValidation");
const {
  insertTileSlotValidation,
} = require("../middlewares/timeSlotValidation");
const authGuard = require("../middlewares/authGuard");

// Router

router.post(
  "/",
  authGuard,
  insertTileSlotValidation(),
  validate,
  insertTileSlot
);
router.get("/:date", authGuard, getAllTimeSlot);

module.exports = router;
