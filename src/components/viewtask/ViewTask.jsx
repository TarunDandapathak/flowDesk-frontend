import { useEffect, useState, useMemo, useCallback, memo } from "react";
import axios from "axios";
import AddTask from "../task/AddTask.jsx";
import "./ViewTask.css";
import TaskSkeliton from "./TaskSkeliton.jsx";
import { useNavigate } from "react-router-dom";
import {
  showSuccessToast,
  showErrorToast,
} from "../notification/Notify";

// Memoized Task Item
const TaskItem = memo(function TaskItem({
  task,
  index,
  onEdit,
  onDelete,
}) {
  const formattedDueDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "No due date";

  return (
    <div
      className="task-card task-animate"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <input
        type="checkbox"
        className="task-checkbox"
        checked={
          task.status === "done" || task.status === "completed"
        }
        readOnly
      />

      <div className="task-main">
        <div className="task-header">
          <h3 className="task-title">{task.title}</h3>

          <div className="badges-and-actions">
            <div className="task-badges">
              {task.priority && (
                <span
                  className={`badge priority-${task.priority.toLowerCase()}`}
                >
                  {task.priority}
                </span>
              )}

              {task.status && (
                <span
                  className={`badge status-${task.status.toLowerCase()}`}
                >
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
                <span className="material-symbols-outlined">
                  edit
                </span>
              </button>

              <button
                className="icon-btn"
                onClick={() =>
                  onDelete(task._id || task.id)
                }
                title="Delete task"
              >
                <span className="material-symbols-outlined">
                  delete
                </span>
              </button>
            </div>
          </div>
        </div>

        {task.description && (
          <p className="task-description">
            {task.description}
          </p>
        )}

        <span className="flex justify-end mt-[1rem]!">
          <i className="fa-solid fa-calendar-days"></i>{" "}
          {formattedDueDate}
        </span>
      </div>
    </div>
  );
});

function ViewTask() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const API_URL =
    "https://flow-desk-backend-ten.vercel.app";

  // Fetch tasks
  const fetchData = useCallback(
    async (isInitial = false) => {
      if (isInitial) {
        setLoading(true);
      }

      try {
        const response = await axios.get(
          `${API_URL}/api/user/task`,
          {
            withCredentials: true,
          }
        );

        setTasks(response.data.tasks || []);
      } catch (error) {
        if (
          error.response?.status === 401 &&
          error.response?.data?.message ===
            "Please login first"
        ) {
          navigate("/login", { replace: true });
        } else {
          console.error(
            "Error fetching tasks:",
            error.response?.data || error.message
          );
        }

        setTasks([]);
      } finally {
        if (isInitial) {
          setLoading(false);
        }
      }
    },
    [navigate]
  );

  // Initial fetch
  useEffect(() => {
    fetchData(true);
  }, [fetchData]);

  // Open add modal
  const handleOpenAddModal = useCallback(() => {
    setEditData(null);
    setIsModalOpen(true);
  }, []);

  // Open edit modal
  const handleOpenEditModal = useCallback((task) => {
    setEditData({
      id: task._id || task.id,
      title: task.title || "",
      description: task.description || "",
      priority: task.priority || "high",
      status: task.status || "todo",
      dueDate: task.dueDate || "",
    });

    setIsModalOpen(true);
  }, []);

  // Delete task
  const handleDeleteTask = useCallback(
    async (taskId) => {
      const previousTasks = [...tasks];

      // Optimistic update
      setTasks((prev) =>
        prev.filter(
          (task) => (task._id || task.id) !== taskId
        )
      );

      try {
        await axios.delete(
          `${API_URL}/api/user/${taskId}/task`,
          {
            withCredentials: true,
          }
        );

        showSuccessToast("Successfully Task Deleted");
      } catch (error) {
        console.error(
          "Error deleting task:",
          error.response?.data || error.message
        );

        showErrorToast(
          error.response?.data?.message ||
            "Something went wrong! Task was not deleted."
        );

        // Rollback
        setTasks(previousTasks);
      }
    },
    [tasks]
  );

  // After add/edit
  const handleTaskSaved = useCallback(() => {
    setIsModalOpen(false);
    fetchData(false);
  }, [fetchData]);

  // Filter tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const search = searchQuery.toLowerCase();

      const matchesSearch =
        task.title?.toLowerCase().includes(search) ||
        task.description?.toLowerCase().includes(search);

      const matchesPriority =
        selectedPriority === "all" ||
        task.priority?.toLowerCase() ===
          selectedPriority.toLowerCase();

      const matchesStatus =
        selectedStatus === "all" ||
        task.status?.toLowerCase() ===
          selectedStatus.toLowerCase();

      return (
        matchesSearch &&
        matchesPriority &&
        matchesStatus
      );
    });
  }, [
    tasks,
    searchQuery,
    selectedPriority,
    selectedStatus,
  ]);

  return (
    <div className="tasks-page">
      <main className="tasks-container">

        {/* Header */}
        <div className="heading-row">
          <div className="heading-text">
            <h1>Tasks</h1>

            <p className="task-count">
              {filteredTasks.length} of {tasks.length} tasks
            </p>
          </div>

          <button
            className="add-task-btn new-btn"
            onClick={handleOpenAddModal}
          >
            New Task
          </button>
        </div>

        {/* Filters */}
        <div className="filters">
          <div className="search-box">
            <span className="material-symbols-outlined search-icon">
              search
            </span>

            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
            />
          </div>

          <div className="select-group">
            <select
              value={selectedPriority}
              onChange={(e) =>
                setSelectedPriority(e.target.value)
              }
            >
              <option value="all">All Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) =>
                setSelectedStatus(e.target.value)
              }
            >
              <option value="all">All Status</option>
              <option value="todo">To Do</option>
              <option value="in-progress">
                In Progress
              </option>
              <option value="done">Complete</option>
            </select>
          </div>
        </div>

        {/* Task List */}
        <div className="task-list">
          {loading ? (
            <TaskSkeliton />
          ) : filteredTasks.length === 0 ? (
            <div className="state-message">
              No tasks found.
            </div>
          ) : (
            filteredTasks
              .slice()
              .reverse()
              .map((task, index) => (
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

        {/* Add/Edit Modal */}
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
