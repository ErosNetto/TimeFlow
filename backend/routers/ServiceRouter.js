const express = require("express");
const router = express.Router();

// Controller
const {
  insertService,
  updateService,
  deleteService,
  getCompanyServices,
  gelServicelById,
} = require("../controllers/ServiceController");

// Middlewares
const validate = require("../middlewares/handleValidation");
const {
  serviceInsertValidation,
  serviceUpdateValidation,
} = require("../middlewares/serviceValidation");
const companyAuthGuard = require("../middlewares/company/companyAuthGuard");

// Router
router.post(
  "/",
  companyAuthGuard,
  serviceInsertValidation(),
  validate,
  insertService
);
router.put(
  "/:id",
  companyAuthGuard,
  serviceUpdateValidation(),
  validate,
  updateService
);
router.delete("/:id", companyAuthGuard, deleteService);
router.get("/company/", companyAuthGuard, getCompanyServices);
router.get("/company/:id", companyAuthGuard, gelServicelById);

module.exports = router;
