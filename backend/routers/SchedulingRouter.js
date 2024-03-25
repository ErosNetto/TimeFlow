const express = require("express");
const router = express.Router();

// Controller
const {
  userMakeSchedule,
  userMakeRescheduling,
  companyMakeSchedule,
  companyMakeRescheduling,
  getAllSchedules,
  getSchedulesById,
  cancelSchedules,
} = require("../controllers/SchedulingController");

// Middlewares
const validate = require("../middlewares/handleValidation");
const {
  userMakeScheduleValidation,
  companyMakeScheduleValidation,
  makeReschedulingValidation,
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
router.get("/", authGuard, getAllSchedules);
// router.get("/user/", authGuard, getUserSchedules);
// router.get("/company/", authGuard, getCompanySchedules);
router.get("/:id", authGuard, getSchedulesById);
router.delete("/:id", authGuard, cancelSchedules);
router.put(
  "/user/:id",
  authGuard,
  makeReschedulingValidation(),
  validate,
  userMakeRescheduling
);
router.put(
  "/company/:id",
  authGuard,
  makeReschedulingValidation(),
  validate,
  companyMakeRescheduling
);

module.exports = router;
