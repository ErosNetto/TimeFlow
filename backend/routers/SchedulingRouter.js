const express = require("express");
const router = express.Router();

// Controller
const {
  userMakeSchedule,
  companyMakeSchedule,
} = require("../controllers/SchedulingController");

// Middlewares
const validate = require("../middlewares/handleValidation");
const {
  userMakeScheduleValidation,
  companyMakeScheduleValidation,
} = require("../middlewares/schedulingValidation");
const authGuard = require("../middlewares/authGuard");

// Router
router.post(
  "/user/",
  authGuard,
  userMakeScheduleValidation(),
  validate,
  userMakeSchedule
);
router.post(
  "/company/",
  authGuard,
  companyMakeScheduleValidation(),
  validate,
  companyMakeSchedule
);

module.exports = router;
