const express = require("express");
const router = express();

// Test router
router.get("/", (req, res) => {
  res.send("API Worting!");
});

module.exports = router;
