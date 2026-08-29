import { useState, useEffect } from "react";
import "./AddTask.css";
import axios from "axios";
import { showSuccessToast, showErrorToast } from "../notification/Notify"


const now = new Date();

const pad = (num) => String(num).padStart(2, "0");

const defaultFormData = {
  title: "",
  description: "",
  priority: "high",
  status: "todo",
  dueDate: `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
    now.getDate()
  )}T23:59`,
};

function AddTask({ isOpen, onClose, onTaskSaved, taskData }) {
  const [formData, setFormData] = useState(defaultFormData);
  const [loading, setLoading] = useState(false);
  const API_URL = "https://flow-desk-backend-ten.vercel.app";
  useEffect(() => {
    if (isOpen) {
      if (taskData) {
        const date = taskData.dueDate
          ? new Date(taskData.dueDate)
          : null;

        const pad = (num) => String(num).padStart(2, "0");

        setFormData({
          title: taskData.title || "",
          description: taskData.description || "",
          priority: taskData.priority || "high",
          status: taskData.status || "todo",
          dueDate: date
            ? `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
              date.getDate()
            )}T${pad(date.getHours())}:${pad(date.getMinutes())}`
            : ""
        });
      } else {
        setFormData(defaultFormData);
      }
    }
  }, [taskData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;
      const taskId = taskData?.id || taskData?._id;

      if (taskData && taskId) {
        // EDIT TASK
        response = await axios.patch(
          `${API_URL}/api/user/${taskId}/task`,
          formData,
          { withCredentials: true }
        );

        showSuccessToast("Successfully Task Edited");

      } else {
        // CREATE TASK
        response = await axios.post(
          `${API_URL}/api/user/task`,
          formData,
          { withCredentials: true }
        );
        showSuccessToast("Task Add Successfully");
      }

      setFormData(defaultFormData);

      // Trigger parent callback to refresh dashboard state
      if (onTaskSaved) {
        onTaskSaved(response.data);
      }

      // Close modal on successful save
      if (onClose) {
        onClose();
      }

    } catch (error) {
      showErrorToast(error.response?.data.message || "Something went wrong .Please Try Again")
      onClose();
      console.error("Error saving task:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="popup">
      <div className="popup-content">
        <button type="button" className="cancle-btn" onClick={onClose}>
          X
        </button>

        <form onSubmit={handleSubmit}>
          <h6>{taskData ? "EDIT TASK" : "NEW TASK"}</h6>

          <hr />

          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <div className="task-options">
            <div className="field">
              <label>Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="field">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >

                {taskData ? (
                  <>
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </>) :
                  <option value="todo">To Do</option>
                }
              </select>
            </div>

            <div className="field">
              <label>Due Date</label>
              <input
                type="datetime-local"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Saving..." : taskData ? "Update Task" : "Add Task"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTask;