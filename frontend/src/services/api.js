import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "https://task-management-stbr.onrender.com/api",
  headers: { "Content-Type": "application/json" },
});

// Request interceptor - add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "Something went wrong";

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      toast.error("Session expired. Please login again.");
    } else if (error.response?.status !== 404) {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default api;

// Task API
export const taskAPI = {
  getAll: (params) => api.get("/tasks", { params }),
  getOne: (id) => api.get(`/tasks/${id}`),
  create: (data) => api.post("/tasks", data),
  update: (id, data) => api.put(`/tasks/${id}`, data),
  delete: (id) => api.delete(`/tasks/${id}`),
  getCalendar: (start, end) =>
    api.get("/tasks/calendar", { params: { start, end } }),
};

// User API
export const userAPI = {
  getAll: (params) => api.get("/users", { params }),
  getOne: (id) => api.get(`/users/${id}`),
  create: (data) => api.post("/users", data),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
  getTeam: () => api.get("/users/team"),
  getManagers: () => api.get("/users/managers"),
  getAssignable: () => api.get("/users/assignable"),
};

// Auth API
export const authAPI = {
  updatePassword: (data) => api.put("/auth/password", data),
};
