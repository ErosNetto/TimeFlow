const express = require("express");
const router = express.Router();

// Controller
const {
  register,
  login,
  getCurrentCompany,
  update,
} = require("../controllers/CompanyController");

// Middlewares
const validate = require("../middlewares/handleValidation");
const {
  companyCreateValidation,
  companyLoginValidation,
  companyUpdateValidation,
} = require("../middlewares/company/companyValidations");
const companyAuthGuard = require("../middlewares/company/companyAuthGuard");
const { imageUpload, processFiles } = require("../middlewares/imageUpload");

// Routes
router.post("/register", companyCreateValidation(), validate, register);
router.post("/login", companyLoginValidation(), validate, login);
router.get("/profile", companyAuthGuard, getCurrentCompany);
router.put(
  "/",
  companyAuthGuard,
  companyUpdateValidation(),
  validate,
  imageUpload.fields([
    { name: "logoImage", maxCount: 1 },
    { name: "facadeImage", maxCount: 1 },
  ]),
  // processFiles,
  update
);

module.exports = router;
