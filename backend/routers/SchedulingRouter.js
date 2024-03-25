const express = require("express");
const router = express.Router();

// Controller
const {
  userMakeSchedule,
  userMakeRescheduling,
  companyMakeSchedule,
  getUserSchedules,
  getSchedulesById,
  getCompanySchedules,
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
router.post(
  "/company/",
  authGuard,
  companyMakeScheduleValidation(),
  validate,
  companyMakeSchedule
);
router.get("/user/", authGuard, getUserSchedules);
router.get("/company/", authGuard, getCompanySchedules);
router.get("/:id", authGuard, getSchedulesById);
router.put(
  "/user/:id",
  authGuard,
  userMakeReschedulingValidation(),
  validate,
  userMakeRescheduling
);

module.exports = router;
