const express = require("express");
const router = express.Router();

// Controller
const {
  insertProfessional,
  deleteProfessional,
  updateProfissional,
  gelCompanyProfessionals,
  gelProfessionalById,
} = require("../controllers/ProfessionalController");

// Middlewares
const {
  professionalInsertValidation,
  professionalUpdateValidation,
} = require("../middlewares/professionalValidation");
const validate = require("../middlewares/handleValidation");
const companyAuthGuard = require("../middlewares/company/companyAuthGuard");

const { imagesUpload } = require("../middlewares/imagesUpload");
const { convertFiles } = require("../middlewares/convertFiles");

// Router
router.post(
  "/",
  companyAuthGuard,
  imagesUpload.single("profileImage"),
  convertFiles,
  professionalInsertValidation(),
  validate,
  insertProfessional
);
router.put(
  "/:id",
  companyAuthGuard,
  imagesUpload.single("profileImage"),
  convertFiles,
  professionalUpdateValidation(),
  validate,
  updateProfissional
);
router.delete("/:id", companyAuthGuard, deleteProfessional);
router.get("/company/", companyAuthGuard, gelCompanyProfessionals);
router.get("/company/:id", companyAuthGuard, gelProfessionalById);

module.exports = router;
