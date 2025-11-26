const Task = require("../models/Task");
const User = require("../models/User");
const { validationResult } = require("express-validator");

// @desc    Get all tasks (filtered by role)
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res, next) => {
  try {
    const {
      status,
      priority,
      search,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    let query = {};
    const userRole = req.user.role;
    //console.log("Role----------->" + userRole);

    // Role-based filtering
    if (userRole === "user") {
      // Users can only see their own assigned tasks
      query.assignedTo = req.user._id;
    } else if (userRole === "manager") {
      // Managers can see tasks assigned to their team members and tasks they created
      const teamMembers = await User.find({ manager: req.user._id }).select(
        "_id"
      );
      const teamIds = teamMembers.map((m) => m._id);
      teamIds.push(req.user._id);
      query.$or = [
        { assignedTo: { $in: teamIds } },
        { createdBy: req.user._id },
      ];
    }
    // Admin sees all tasks (no additional filter needed)

    // Apply additional filters
    if (status) query.status = status;
    if (priority) query.priority = priority;

    // Search functionality
    if (search) {
      query.$and = query.$and || [];
      query.$and.push({
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      });
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortOrder = order === "asc" ? 1 : -1;

    // Execute query with population and pagination
    const [tasks, total] = await Promise.all([
      Task.find(query)
        .populate("assignedTo", "name email")
        .populate("createdBy", "name email")
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(parseInt(limit)),
      Task.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: tasks,
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

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Check if user has access to this task
    if (!canAccessTask(req.user, task)) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this task",
      });
    }

    res.json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private (Admin, Manager)
const createTask = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { title, description, status, priority, dueDate, assignedTo } =
      req.body;

    // Validate assignee exists
    const assignee = await User.findById(assignedTo);
    if (!assignee) {
      return res.status(400).json({
        success: false,
        message: "Assigned user not found",
      });
    }

    // Managers can only assign tasks to their team members
    if (req.user.role === "manager") {
      const isTeamMember =
        assignee.manager?.toString() === req.user._id.toString() ||
        assignedTo === req.user._id.toString();
      if (!isTeamMember) {
        return res.status(403).json({
          success: false,
          message: "Can only assign tasks to your team members",
        });
      }
    }

    // Create task
    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      assignedTo,
      createdBy: req.user._id,
      team: req.user.role === "manager" ? req.user._id : null,
    });

    // Populate and return
    const populatedTask = await Task.findById(task._id)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");

    res.status(201).json({
      success: true,
      data: populatedTask,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private (Role-based permissions)
const updateTask = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const userRole = req.user.role;
    const userId = req.user._id.toString();

    // Role-based update permissions
    if (userRole === "user") {
      // Users can only update status of their own assigned tasks
      if (task.assignedTo.toString() !== userId) {
        return res.status(403).json({
          success: false,
          message: "Not authorized to update this task",
        });
      }

      // Users can only update status
      const { status } = req.body;
      if (Object.keys(req.body).some((key) => key !== "status")) {
        return res.status(403).json({
          success: false,
          message: "Users can only update task status",
        });
      }

      task = await Task.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true }
      );
    } else if (userRole === "manager") {
      // Managers can update tasks they created or tasks assigned to their team
      if (!(await canManagerModifyTask(req.user, task))) {
        return res.status(403).json({
          success: false,
          message: "Not authorized to update this task",
        });
      }

      const { title, description, status, priority, dueDate, assignedTo } =
        req.body;
      task = await Task.findByIdAndUpdate(
        req.params.id,
        { title, description, status, priority, dueDate, assignedTo },
        { new: true, runValidators: true }
      );
    } else {
      // Admin can update everything
      task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
    }

    // Populate updated task
    const populatedTask = await Task.findById(task._id)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");

    res.json({
      success: true,
      data: populatedTask,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private (Admin only)
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get tasks for calendar view
// @route   GET /api/tasks/calendar
// @access  Private
const getCalendarTasks = async (req, res, next) => {
  try {
    const { start, end } = req.query;

    if (!start || !end) {
      return res.status(400).json({
        success: false,
        message: "Start and end dates are required",
      });
    }

    let query = {
      dueDate: {
        $gte: new Date(start),
        $lte: new Date(end),
      },
    };

    const userRole = req.user.role;

    // Apply role-based filtering
    if (userRole === "user") {
      query.assignedTo = req.user._id;
    } else if (userRole === "manager") {
      const teamMembers = await User.find({ manager: req.user._id }).select(
        "_id"
      );
      const teamIds = teamMembers.map((m) => m._id);
      teamIds.push(req.user._id);
      query.assignedTo = { $in: teamIds };
    }
    // Admin sees all calendar events

    const tasks = await Task.find(query)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email")
      .sort({ dueDate: 1 });

    // Format for calendar component
    const calendarEvents = tasks.map((task) => ({
      id: task._id,
      title: task.title,
      start: task.dueDate,
      end: task.dueDate,
      status: task.status,
      priority: task.priority,
      assignedTo: task.assignedTo,
    }));

    res.json({
      success: true,
      data: calendarEvents,
    });
  } catch (error) {
    next(error);
  }
};

// Helper function: Check if user can access task
function canAccessTask(user, task) {
  if (user.role === "admin") return true;

  if (user.role === "user") {
    return task.assignedTo._id.toString() === user._id.toString();
  }

  if (user.role === "manager") {
    return (
      task.createdBy._id.toString() === user._id.toString() ||
      task.team?.toString() === user._id.toString() ||
      task.assignedTo._id.toString() === user._id.toString()
    );
  }

  return false;
}

// Helper function: Check if manager can modify task
async function canManagerModifyTask(manager, task) {
  // Manager created the task
  if (task.createdBy.toString() === manager._id.toString()) return true;

  // Task is assigned to manager's team member
  const assignee = await User.findById(task.assignedTo);
  return assignee?.manager?.toString() === manager._id.toString();
}

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getCalendarTasks,
};
