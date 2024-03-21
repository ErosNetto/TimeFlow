const express = require("express");
const router = express.Router();

// Controller
const { register, login } = require("../controllers/CompanyController");

// Middlewares
const validate = require("../middlewares/handleValidation");
const {
  companyCreateValidation,
  companyLoginValidation,
} = require("../middlewares/companyValidations");

// Routes
router.post("/register", companyCreateValidation(), validate, register);
router.post("/login", companyLoginValidation(), validate, login);

module.exports = router;
