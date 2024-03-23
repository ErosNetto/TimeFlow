const express = require("express");
const router = express.Router();

// Controller
const { insertService } = require("../controllers/ServiceController");

// Middlewares
const validate = require("../middlewares/handleValidation");
const { serviceInsertValidation } = require("../middlewares/serviceValidation");
const companyAuthGuard = require("../middlewares/company/companyAuthGuard");

// Router
router.post(
  "/",
  companyAuthGuard,
  serviceInsertValidation(),
  validate,
  insertService
);

module.exports = router;
