const express = require("express");
const router = express.Router();

// Controller
const {
  userMakeSchedule,
  userMakeRescheduling,
  companyMakeSchedule,
  getUserSchedules,
} = require("../controllers/SchedulingController");

// Middlewares
const validate = require("../middlewares/handleValidation");
const {
  userMakeScheduleValidation,
  userMakeReschedulingValidation,
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
router.get("/user/", authGuard, getUserSchedules);
router.put(
  "/user/:id",
  authGuard,
  userMakeReschedulingValidation(),
  validate,
  userMakeRescheduling
);
router.post(
  "/company/",
  authGuard,
  companyMakeScheduleValidation(),
  validate,
  companyMakeSchedule
);

module.exports = router;
