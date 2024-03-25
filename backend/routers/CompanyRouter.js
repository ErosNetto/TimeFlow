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
  searchCompany,
} = require("../controllers/CompanyController");

// Middlewares
const validate = require("../middlewares/handleValidation");
const {
  companyCreateValidation,
  companyLoginValidation,
  companyUpdateValidation,
} = require("../middlewares/companyValidations");
const authGuard = require("../middlewares/authGuard");
const { imagesUpload } = require("../middlewares/imagesUpload");
const { convertFiles } = require("../middlewares/convertFiles");

// Routes
router.post("/register", companyCreateValidation(), validate, register);
router.post("/login", companyLoginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentCompany);
router.put(
  "/",
  authGuard,
  imagesUpload.fields([
    { name: "logoImage", maxCount: 1 },
    { name: "facadeImage", maxCount: 1 },
  ]),
  convertFiles,
  companyUpdateValidation(),
  validate,
  update
);
router.get("/search", authGuard, searchCompany);
router.get("/:id", authGuard, getCompanyById);
router.get("/", authGuard, getAllCompanies);

module.exports = router;
