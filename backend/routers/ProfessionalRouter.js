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
const authGuard = require("../middlewares/authGuard");

const { imagesUpload } = require("../middlewares/imagesUpload");
const { convertFiles } = require("../middlewares/convertFiles");

// Router
router.post(
  "/",
  authGuard,
  imagesUpload.single("profileImage"),
  convertFiles,
  professionalInsertValidation(),
  validate,
  insertProfessional
);
router.put(
  "/:id",
  authGuard,
  imagesUpload.single("profileImage"),
  convertFiles,
  professionalUpdateValidation(),
  validate,
  updateProfissional
);
router.delete("/:id", authGuard, deleteProfessional);
router.get("/company/", authGuard, gelCompanyProfessionals);
router.get("/company/:id", authGuard, gelProfessionalById);

module.exports = router;
