const express = require("express");
const router = express.Router();

// Controller
const {
  register,
  login,
  getCurrentCompany,
  update,
  getCompanyById,
  getAllCompanies,
} = require("../controllers/CompanyController");

// Middlewares
const validate = require("../middlewares/handleValidation");
const {
  companyCreateValidation,
  companyLoginValidation,
  companyUpdateValidation,
} = require("../middlewares/company/companyValidations");
const companyAuthGuard = require("../middlewares/company/companyAuthGuard");
const { imagesUpload } = require("../middlewares/imagesUpload");
const { convertFiles } = require("../middlewares/convertFiles");

// Routes
router.post("/register", companyCreateValidation(), validate, register);
router.post("/login", companyLoginValidation(), validate, login);
router.get("/profile", companyAuthGuard, getCurrentCompany);
router.put(
  "/",
  companyAuthGuard,
  imagesUpload.fields([
    { name: "logoImage", maxCount: 1 },
    { name: "facadeImage", maxCount: 1 },
  ]),
  convertFiles,
  companyUpdateValidation(),
  validate,
  update
);
router.get("/:id", companyAuthGuard, getCompanyById);
router.get("/", companyAuthGuard, getAllCompanies);

module.exports = router;
