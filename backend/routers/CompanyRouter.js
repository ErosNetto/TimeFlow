const express = require("express");
const router = express.Router();

// Controller
const {
  register,
  login,
  getCurrentCompany,
} = require("../controllers/CompanyController");

// Middlewares
const validate = require("../middlewares/handleValidation");
const {
  companyCreateValidation,
  companyLoginValidation,
} = require("../middlewares/company/companyValidations");
const companyAuthGuard = require("../middlewares/company/companyAuthGuard");

// Routes
router.post("/register", companyCreateValidation(), validate, register);
router.post("/login", companyLoginValidation(), validate, login);
router.get("/profile", companyAuthGuard, getCurrentCompany);

module.exports = router;
