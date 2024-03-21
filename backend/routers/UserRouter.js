const express = require("express");
const router = express.Router();

// Controller
const {
  register,
  login,
  getCurrentUser,
  update,
} = require("../controllers/UserController");

// Middlewares
const validate = require("../middlewares/handleValidation");
const {
  userCreateValidation,
  userLoginValidation,
  userUpdateValidation,
} = require("../middlewares/user/userValidations");
const userAuthGuard = require("../middlewares/user/userAuthGuard");

//Routes
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", userLoginValidation(), validate, login);
router.get("/profile", userAuthGuard, getCurrentUser);
router.put("/", userAuthGuard, userUpdateValidation(), validate, update);

module.exports = router;
