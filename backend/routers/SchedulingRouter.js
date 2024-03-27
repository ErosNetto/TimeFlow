const express = require("express");
const router = express.Router();

// Controller
const {
  userMakeScheduling,
  userMakeRescheduling,
  companyMakeScheduling,
  companyMakeRescheduling,
  getAllScheduling,
  getSchedulingById,
  cancelScheduling,
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
  userMakeScheduling
);
router.post(
  "/company/",
  authGuard,
  companyMakeScheduleValidation(),
  validate,
  companyMakeScheduling
);
router.get("/", authGuard, getAllScheduling);
router.get("/:id", authGuard, getSchedulingById);
router.delete("/:id", authGuard, cancelScheduling);
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
