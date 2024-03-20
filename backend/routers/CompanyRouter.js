const express = require("express");
const router = express.Router();

// Controller
const { register } = require("../controllers/CompanyController");

// Middlewares
const validate = require("../middlewares/handleValidation");
const {
  companyCreateValidation,
} = require("../middlewares/companyValidations");

// Routes
router.post("/register", companyCreateValidation(), validate, register);

module.exports = router;
