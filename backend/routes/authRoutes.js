const express = require("express");
const { body } = require("express-validator");
const {
  signup,
  login,
  getMe,
  updatePassword,
} = require("../controllers/authController");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Validation rules for signup
const signupValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

// Validation rules for login
const loginValidation = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

// Validation rules for password update
const passwordValidation = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters"),
];

// Public routes
router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);

// Protected routes
router.get("/me", protect, getMe);
router.put("/password", protect, passwordValidation, updatePassword);

module.exports = router;
