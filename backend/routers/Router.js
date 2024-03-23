const express = require("express");
const router = express();

router.use("/api/users", require("./UserRouter"));
router.use("/api/companies", require("./CompanyRouter"));
router.use("/api/services", require("./ServiceRouter"));
router.use("/api/professionals", require("./ProfessionalRouter"));

module.exports = router;
