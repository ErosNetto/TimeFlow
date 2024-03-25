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
const authGuard = require("../middlewares/authGuard");

// Router
router.post("/", authGuard, serviceInsertValidation(), validate, insertService);
router.put(
  "/:id",
  authGuard,
  serviceUpdateValidation(),
  validate,
  updateService
);
router.delete("/:id", authGuard, deleteService);
router.get("/company/", authGuard, getCompanyServices);
router.get("/company/:id", authGuard, gelServicelById);

module.exports = router;
