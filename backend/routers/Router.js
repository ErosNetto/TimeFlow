const express = require("express");
const router = express();

router.use("/api/users", require("./UserRouter"));
router.use("/api/companies", require("./CompanyRouter"));
router.use("/api/services", require("./ServiceRouter"));
router.use("/api/professionals", require("./ProfessionalRouter"));
router.use("/api/timeSlot", require("./TimeSlotRouter"));
router.use("/api/scheduling", require("./SchedulingRouter"));
router.use("/api/message", require("./MessageRouter"));

module.exports = router;
