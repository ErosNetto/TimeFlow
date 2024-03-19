const express = require("express");
const router = express();

router.use("/api/users", require("./UserRouter"));

// Test router
router.get("/", (req, res) => {
  res.send("API Worting!");
});

module.exports = router;
