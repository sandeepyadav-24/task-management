const express = require("express");
const { body } = require("express-validator");
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getCalendarTasks,
} = require("../controllers/taskController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Validation rules for creating a new task
const taskValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 100 })
    .withMessage("Title cannot exceed 100 characters"),
  body("description")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters"),
  body("status")
    .optional()
    .isIn(["pending", "in-progress", "completed"])
    .withMessage("Invalid status. Must be pending, in-progress, or completed"),
  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Invalid priority. Must be low, medium, or high"),
  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid date format. Use ISO 8601 format"),
  body("assignedTo")
    .notEmpty()
    .withMessage("Task must be assigned to a user")
    .isMongoId()
    .withMessage("Invalid user ID format"),
];

// Validation rules for updating a task
const updateValidation = [
  body("title")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Title cannot exceed 100 characters"),
  body("description")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters"),
  body("status")
    .optional()
    .isIn(["pending", "in-progress", "completed"])
    .withMessage("Invalid status. Must be pending, in-progress, or completed"),
  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Invalid priority. Must be low, medium, or high"),
  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid date format. Use ISO 8601 format"),
  body("assignedTo")
    .optional()
    .isMongoId()
    .withMessage("Invalid user ID format"),
];

// Apply authentication middleware to all routes
router.use(protect);

// Simple test route
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Task routes are working!",
    user: req.user, // This will show if auth is working
  });
});

// Calendar route - MUST be before /:id to avoid route conflict
// GET /api/tasks/calendar?start=2024-01-01&end=2024-12-31
router.get("/calendar", getCalendarTasks);

// Task collection routes
router
  .route("/")
  // GET /api/tasks - Get all tasks (filtered by user role)
  // Query params: status, priority, search, page, limit, sortBy, order
  .get(getTasks)

  // POST /api/tasks - Create new task (Admin and Manager only)
  // Body: title, description, status, priority, dueDate, assignedTo
  .post(authorize("admin", "manager"), taskValidation, createTask);

// Individual task routes
router
  .route("/:id")
  // GET /api/tasks/:id - Get single task by ID
  .get(getTask)

  // PUT /api/tasks/:id - Update task
  // Permissions: Admin (all fields), Manager (team tasks), User (own task status only)
  .put(updateValidation, updateTask)

  // DELETE /api/tasks/:id - Delete task (Admin only)
  .delete(authorize("admin"), deleteTask);

module.exports = router;
