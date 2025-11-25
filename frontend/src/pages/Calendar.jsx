import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { taskAPI } from "../services/api";

const Calendar = () => {
  const navigate = useNavigate();
  const calendarRef = useRef(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchEvents = async (fetchInfo, successCallback, failureCallback) => {
    try {
      const res = await taskAPI.getCalendar(
        fetchInfo.startStr,
        fetchInfo.endStr
      );
      const events = res.data.data.map((task) => ({
        id: task.id,
        title: task.title,
        start: task.start,
        end: task.end,
        className: `priority-${task.priority}`,
        extendedProps: {
          status: task.status,
          priority: task.priority,
          assignedTo: task.assignedTo,
        },
      }));
      successCallback(events);
    } catch (error) {
      failureCallback(error);
    }
  };

  const handleEventClick = (info) => {
    setSelectedTask({
      id: info.event.id,
      title: info.event.title,
      start: info.event.start,
      status: info.event.extendedProps.status,
      priority: info.event.extendedProps.priority,
      assignedTo: info.event.extendedProps.assignedTo,
    });
  };

  const handleDateClick = (info) => {
    console.log("Date clicked:", info.dateStr);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
        <p className="text-gray-600 mt-1">View your tasks by due date</p>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={fetchEvents}
          eventClick={handleEventClick}
          dateClick={handleDateClick}
          editable={false}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={3}
          weekends={true}
          height="auto"
          eventDisplay="block"
          eventTimeFormat={{
            hour: "numeric",
            minute: "2-digit",
            meridiem: "short",
          }}
        />
      </div>

      {/* Task Details Modal */}
      {selectedTask && (
        <div
          onClick={() => setSelectedTask(null)}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl max-w-lg w-full"
          >
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Task Details
              </h3>
              <button
                onClick={() => setSelectedTask(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                &times;
              </button>
            </div>

            <div className="px-6 py-4 space-y-4">
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  {selectedTask.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {formatDate(selectedTask.start)}
                </p>
              </div>

              <div className="flex gap-2">
                <span
                  className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
                    selectedTask.status
                  )}`}
                >
                  {selectedTask.status}
                </span>
                <span
                  className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(
                    selectedTask.priority
                  )}`}
                >
                  {selectedTask.priority}
                </span>
              </div>

              {selectedTask.assignedTo && (
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    <strong>Assigned to:</strong> {selectedTask.assignedTo.name}
                  </p>
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setSelectedTask(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => navigate(`/tasks/${selectedTask.id}/edit`)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
              >
                Edit Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
