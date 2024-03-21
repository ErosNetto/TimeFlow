const express = require("express");
const router = express();

// User router
router.use("/api/users", require("./UserRouter"));

// Company router
router.use("/api/companies", require("./CompanyRouter"));

// Test router
router.get("/", (req, res) => {
  res.send("API Worting!");
});

module.exports = router;
