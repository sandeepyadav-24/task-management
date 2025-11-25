import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { taskAPI } from "../services/api";
import {
  FiCheckSquare,
  FiClock,
  FiAlertCircle,
  FiCheckCircle,
  FiPlus,
} from "react-icons/fi";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
  });
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await taskAPI.getAll({
        limit: 5,
        sortBy: "createdAt",
        order: "desc",
      });
      const tasks = res.data.data;

      setRecentTasks(tasks);

      // Fetch full stats
      const [pending, inProgress, completed] = await Promise.all([
        taskAPI.getAll({ status: "pending", limit: 1 }),
        taskAPI.getAll({ status: "in-progress", limit: 1 }),
        taskAPI.getAll({ status: "completed", limit: 1 }),
      ]);

      setStats({
        total: res.data.pagination.total,
        pending: pending.data.pagination.total,
        inProgress: inProgress.data.pagination.total,
        completed: completed.data.pagination.total,
      });
    } catch (error) {
      console.error("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: "Total Tasks",
      value: stats.total,
      icon: FiCheckSquare,
      bgColor: "bg-blue-500",
      textColor: "text-blue-600",
      lightBg: "bg-blue-50",
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: FiClock,
      bgColor: "bg-amber-500",
      textColor: "text-amber-600",
      lightBg: "bg-amber-50",
    },
    {
      label: "In Progress",
      value: stats.inProgress,
      icon: FiAlertCircle,
      bgColor: "bg-purple-500",
      textColor: "text-purple-600",
      lightBg: "bg-purple-50",
    },
    {
      label: "Completed",
      value: stats.completed,
      icon: FiCheckCircle,
      bgColor: "bg-green-500",
      textColor: "text-green-600",
      lightBg: "bg-green-50",
    },
  ];

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-amber-100 text-amber-800",
      "in-progress": "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
    };
    return styles[status] || "bg-gray-100 text-gray-800";
  };

  const getPriorityBadge = (priority) => {
    const styles = {
      low: "bg-indigo-100 text-indigo-800",
      medium: "bg-amber-100 text-amber-800",
      high: "bg-red-100 text-red-800",
    };
    return styles[priority] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name?.split(" ")[0]}!
          </h1>
          <p className="text-gray-600 mt-1">
            Here's what's happening with your tasks
          </p>
        </div>
        {["admin", "manager"].includes(user?.role) && (
          <Link
            to="/tasks/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
          >
            <FiPlus /> New Task
          </Link>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-3xl font-bold text-gray-900">
                  {loading ? "-" : stat.value}
                </p>
                <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
              </div>
              <div
                className={`${stat.lightBg} ${stat.textColor} p-3 rounded-xl`}
              >
                <stat.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Tasks */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Recent Tasks</h2>
          <Link
            to="/tasks"
            className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
          >
            View All
          </Link>
        </div>
        <div className="p-6">
          {loading ? (
            <p className="text-center text-gray-500 py-8">Loading...</p>
          ) : recentTasks.length === 0 ? (
            <div className="text-center py-12">
              <FiCheckSquare className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-500 text-lg">No tasks yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                      Title
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                      Priority
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                      Due Date
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                      Assigned To
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentTasks.map((task) => (
                    <tr
                      key={task._id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-4">
                        <Link
                          to={`/tasks/${task._id}/edit`}
                          className="text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                          {task.title}
                        </Link>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
                            task.status
                          )}`}
                        >
                          {task.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(
                            task.priority
                          )}`}
                        >
                          {task.priority}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {task.dueDate ? formatDate(task.dueDate) : "-"}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {task.assignedTo?.name || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
