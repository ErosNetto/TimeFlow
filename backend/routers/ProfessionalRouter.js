const express = require("express");
const router = express.Router();

// Controller
const {
  insertProfessional,
  deleteProfessional,
} = require("../controllers/ProfessionalController");

// Middlewares
const {
  professionalInsertValidation,
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
router.delete("/:id", companyAuthGuard, deleteProfessional);

module.exports = router;
