const User = require("../models/User");
const Task = require("../models/Task");
const { validationResult } = require("express-validator");

// @desc    Get all users
// @route   GET /api/users
// @access  Private (Admin)
const getUsers = async (req, res, next) => {
  try {
    const { role, search, page = 1, limit = 10 } = req.query;
    let query = {};

    // Filter by role
    if (role) query.role = role;

    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [users, total] = await Promise.all([
      User.find(query)
        .populate("manager", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      User.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private (Admin)
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "manager",
      "name email"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Get user's task statistics
    const taskStats = await Task.aggregate([
      { $match: { assignedTo: user._id } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    res.json({
      success: true,
      data: {
        ...user.toObject(),
        taskStats,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new user
// @route   POST /api/users
// @access  Private (Admin)
const createUser = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { name, email, password, role, manager } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Validate manager if provided
    if (manager) {
      const mgr = await User.findById(manager);
      if (!mgr || mgr.role !== "manager") {
        return res.status(400).json({
          success: false,
          message: "Invalid manager",
        });
      }
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role,
      manager,
    });

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        manager: user.manager,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private (Admin)
const updateUser = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { name, email, role, manager } = req.body;

    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Validate manager if provided
    if (manager) {
      const mgr = await User.findById(manager);
      if (!mgr || mgr.role !== "manager") {
        return res.status(400).json({
          success: false,
          message: "Invalid manager",
        });
      }
    }

    // Update user
    user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role, manager },
      { new: true, runValidators: true }
    ).populate("manager", "name email");

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private (Admin)
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Prevent deleting self
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete your own account",
      });
    }

    // Unassign tasks or handle as needed
    await Task.updateMany(
      { assignedTo: user._id },
      { $unset: { assignedTo: "" } }
    );

    // Update team members if deleting a manager
    if (user.role === "manager") {
      await User.updateMany({ manager: user._id }, { $unset: { manager: "" } });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get team members (for managers)
// @route   GET /api/users/team
// @access  Private (Manager)
const getTeamMembers = async (req, res, next) => {
  try {
    const teamMembers = await User.find({ manager: req.user._id }).select(
      "name email role createdAt"
    );

    res.json({
      success: true,
      data: teamMembers,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all managers (for assignment dropdown)
// @route   GET /api/users/managers
// @access  Private (Admin)
const getManagers = async (req, res, next) => {
  try {
    const managers = await User.find({ role: "manager" }).select("name email");

    res.json({
      success: true,
      data: managers,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get assignable users (for task assignment)
// @route   GET /api/users/assignable
// @access  Private (Admin, Manager)
const getAssignableUsers = async (req, res, next) => {
  try {
    let query = {};

    if (req.user.role === "manager") {
      // Managers can only assign to their team + themselves
      query.$or = [{ manager: req.user._id }, { _id: req.user._id }];
    }
    // Admin can assign to anyone (no filter needed)

    const users = await User.find(query).select("name email role");

    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getTeamMembers,
  getManagers,
  getAssignableUsers,
};
