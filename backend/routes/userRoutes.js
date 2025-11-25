const express = require("express");
const { body } = require("express-validator");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getTeamMembers,
  getManagers,
  getAssignableUsers,
} = require("../controllers/userController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Validation rules for creating user
const createUserValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("role")
    .optional()
    .isIn(["admin", "manager", "user"])
    .withMessage("Invalid role"),
  body("manager").optional().isMongoId().withMessage("Invalid manager ID"),
];

// Validation rules for updating user
const updateUserValidation = [
  body("name").optional().trim().notEmpty().withMessage("Name cannot be empty"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Please provide a valid email"),
  body("role")
    .optional()
    .isIn(["admin", "manager", "user"])
    .withMessage("Invalid role"),
  body("manager").optional().isMongoId().withMessage("Invalid manager ID"),
];

// All routes require authentication
router.use(protect);

// Team routes (for managers)
router.get("/team", authorize("manager"), getTeamMembers);

// Assignable users route (for task assignment)
router.get("/assignable", authorize("admin", "manager"), getAssignableUsers);

// Manager list route (admin only)
router.get("/managers", authorize("admin"), getManagers);

// Admin-only user management routes
router
  .route("/")
  .get(authorize("admin"), getUsers)
  .post(authorize("admin"), createUserValidation, createUser);

router
  .route("/:id")
  .get(authorize("admin"), getUser)
  .put(authorize("admin"), updateUserValidation, updateUser)
  .delete(authorize("admin"), deleteUser);

module.exports = router;
