import { useEffect, useState, useMemo, useCallback, memo } from "react";

import axios from "axios";
import AddTask from "../task/AddTask.jsx";
import "./ViewTask.css";
import TaskSkeliton from "./TaskSkeliton.jsx";
import { useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "../notification/Notify"


// Memoized Task Item to prevent re-rendering unaffected items
const TaskItem = memo(function TaskItem({ task, index, onEdit, onDelete }) {
  return (
    <div
      className="task-card task-animate"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.status === "done" || task.status === "completed"}
        readOnly
      />

      <div className="task-main">
        <div className="task-header">
          <h3 className="task-title">{task.title}</h3>
          <div className="badges-and-actions">
            <div className="task-badges">

              {task.priority && (
                <span className={`badge priority-${task.priority.toLowerCase()}`}>
                  {task.priority}
                </span>
              )}
              {task.status && (
                <span className={`badge status-${task.status.toLowerCase()}`}>
                  {task.status}
                </span>
              )}
            </div>

            <div className="task-actions">
              <button
                className="icon-btn"
                onClick={() => onEdit(task)}
                title="Edit task"
              >
                <span className="material-symbols-outlined">edit</span>
              </button>

              <button
                className="icon-btn"
                onClick={() => onDelete(task._id || task.id)}
                title="Delete task"
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
        </div>

        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        <span className="flex justify-end mt-[1rem]!">
          <i className="fa-solid fa-calendar-days"></i>
          <p className="text-sm!"> {new Date(task.dueDate).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",

          })}</p>
        </span>
      </div>
    </div>
  );
});

function ViewTask() {
  const [tasks, setTasks] = useState([]);
  const [deshtask, setDeshTask] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);




  // Fetch data - only show loading skeleton on initial page load
  const fetchData = useCallback(async (isInitial = false) => {
    if (isInitial) setLoading(true);
    const API_URL = "https://flow-desk-backend-ten.vercel.app";
    try {
      const response = await axios.get(`${API_URL}/api/user/task`, {
        withCredentials: true,
      });
      setTasks(response.data.tasks || []);
    } catch (error) {
      if (
        error.response?.status === 401 &&
        error.response?.data?.message === "Please login first"
      ) {
        navigate("/login", { replace: true });
      } else {
        console.error("Error fetching tasks:", error.response?.data || error.message);
      }
      setTasks([]);
    } finally {
      if (isInitial) setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchData(true);
  }, [fetchData]);

  const handleOpenAddModal = useCallback(() => {
    setEditData(null);
    setIsModalOpen(true);
  }, []);

  const handleOpenEditModal = useCallback((task) => {
    setEditData({
      id: task._id || task.id,
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate,
    });
    setIsModalOpen(true);
  }, []);

  // Optimistic deletion: update UI immediately without triggering full re-fetch/loading
  const handleDeleteTask = useCallback(async (taskId) => {
    const API_URL = "https://flow-desk-backend-ten.vercel.app";
    // Save previous state for rollback on failure
    const previousTasks = [...tasks];
    setTasks((prev) => prev.filter((t) => (t._id || t.id) !== taskId));

    try {
      await axios.delete(`${API_URL}/api/user/${taskId}/task`, {
        withCredentials: true,
      });
      showSuccessToast("Successfully Task Deleted")
    } catch (error) {
      console.error("Error deleting task:", error);
      showErrorToast(error.response.data?.message || "Something Wrong Happend ! Task is not Deleted")
      setTasks(previousTasks); // Rollback on error
    }
  }, [tasks]);

  // Silent re-fetch on add/edit modal submit
  const handleTaskSaved = useCallback(() => {
    setIsModalOpen(false);
    fetchData(false); // Background update, no loading skeleton trigger
  }, [fetchData]);

  // Memoize filtered calculation so search typing is fast
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPriority =
        selectedPriority === "all" ||
        task.priority?.toLowerCase() === selectedPriority.toLowerCase();

      const matchesStatus =
        selectedStatus === "all" ||
        task.status?.toLowerCase() === selectedStatus.toLowerCase();

      return matchesSearch && matchesPriority && matchesStatus;
    });
  }, [tasks, searchQuery, selectedPriority, selectedStatus]);

  return (
    <div className="tasks-page">
      <main className="tasks-container">
        {/* Header Section */}
        <div className="heading-row">
          <div className="heading-text">
            <h1>Tasks</h1>
            <p className="task-count">
              {filteredTasks.length} of {tasks.length} tasks
            </p>
          </div>

          <button className="add-task-btn new-btn" onClick={handleOpenAddModal}>
            New Task
          </button>
        </div>

        {/* Filter Controls Section */}
        <div className="filters">
          <div className="search-box">
            <span className="material-symbols-outlined search-icon">search</span>
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="select-group">
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
            >
              <option value="all">All Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Complete</option>
            </select>
          </div>
        </div>

        {/* Task List Container */}
        <div className="task-list">
          {loading ? (
            <TaskSkeliton />
          ) : filteredTasks.length === 0 ? (
            <div className="state-message">No tasks found.</div>
          ) : (
            filteredTasks.slice().reverse().map((task, index) => (
              <TaskItem
                key={task._id || task.id}
                task={task}
                index={index}
                onEdit={handleOpenEditModal}
                onDelete={handleDeleteTask}
              />
            ))
          )}
        </div>

        {/* Modal Component */}
        <AddTask
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onTaskSaved={handleTaskSaved}
          taskData={editData}
        />
      </main>
    </div>
  );
}

export { ViewTask, TaskItem };


