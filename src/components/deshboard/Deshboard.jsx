import { useState, useEffect } from "react";

import Addtask from "../task/AddTask.jsx";
import Barchart from "../charts/Barchart.jsx";
import DonutChart from "../charts/DonutChart.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function Dashboard() {
  const API_URL = "https://flow-desk-backend-ten.vercel.app";
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [totalTasks, setTotalTasks] = useState(0);
  const [inProgressTask, setInProgresstask] = useState(0);
  const [completeTasks, setcompleteTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [tasks, setTasks] = useState([]);


  // =====================================================
  // GET TASK DATA
  // =====================================================
  const getData = async () => {
    try {
      const fetchdata = await axios.get(
        `${API_URL}/api/user/task`,
        {
          withCredentials: true,
        }
      );

      // Get tasks
      const tasks = fetchdata.data.tasks;


      // Update tasks state so charts also get the latest data
      setTasks(tasks);

      // console.log("Updated tasks:", tasks);

      // =====================================================
      // TODAY START
      // =====================================================
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);

      // =====================================================
      // TODAY END
      // =====================================================
      const endOfToday = new Date();
      endOfToday.setHours(23, 59, 59, 999);

      // =====================================================
      // TOTAL TASKS - TODAY ONLY
      // =====================================================
      const totalTask = tasks.filter((task) => {
        const dueDate = new Date(task.dueDate);

        return dueDate >= startOfToday && dueDate <= endOfToday;
      });
      setTotalTasks(totalTask.length);

      // =====================================================
      // IN-PROGRESS TASKS - TODAY ONLY
      // =====================================================
      const inProgressTask = tasks.filter((task) => {
        const dueDate = new Date(task.dueDate);

        return (
          task.status === "in-progress" &&
          dueDate >= startOfToday &&
          dueDate <= endOfToday
        );
      }).length;

      setInProgresstask(inProgressTask);

      // =====================================================
      // COMPLETED TASKS - TODAY ONLY
      // =====================================================
      const completeTask = tasks.filter((task) => {
        const dueDate = new Date(task.completeDate);

        return (
          task.status === "done" &&
          dueDate >= startOfToday &&
          dueDate <= endOfToday
        );
      }).length;

      setcompleteTasks(completeTask);

      // ===================================
      // due this week 
      const now = new Date();

      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(now.getDate() - 7);

      const pendingTask = tasks.filter((task) => {
        const dueDate = new Date(task.dueDate);

        return (
          dueDate >= sevenDaysAgo &&
          dueDate <= now &&
          task.status !== "done"
        );
      }).length;
      setPendingTasks(pendingTask)
      // console.log("panding task",pendingTask);

    } catch (error) {
      if (
        error.response?.status === 401 &&
        error.response?.data?.message === "Please login first"
      ) {
        navigate("/login", { replace: true });
      } else {
        console.log(
          "Error fetching tasks:",
          error.response?.data || error.message

        )
      };
    }
  };

  // =====================================================
  // LOAD DATA WHEN DASHBOARD OPENS
  // =====================================================
  useEffect(() => {
    getData();
  }, []);


  // =====================================================
  // OPEN ADD TASK MODAL
  // =====================================================
  const handleOpenAddTask = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };
  // console.log(totalTask);
  // console.log("totalTask", totalTasks);

  // =====================================================
  // TASK SAVED
  // =====================================================
  const handleTaskSaved = async () => {
    // Close modal
    handleCloseModal();
    // Fetch the latest tasks after adding/updating a task
    await getData();
  };

  // =====================================================
  // CURRENT DATE
  // =====================================================
  const date = new Date();
  // Tuesday, August 25, 2026 --it show like this 

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // =====================================================
  // UI
  // =====================================================
  return (
    <span className="flex justify-center mt-5 mx-3">
      <main className="col-12 col-md-9 col-lg-11 dashboard-main">

        {/* Header section */}
        <div className="top-bar d-flex justify-content-between align-items-center mb-1 flex-wrap gap-2">

          <h1 className="h2 mb-0 fw-bold text-4xl!">
            Dashboard
          </h1>

          {/* New Task Button */}
          <button
            className="new-btn   text-2xl! font-bold"
            onClick={handleOpenAddTask}

          >
            + New Task
          </button>

        </div>

        {/* Add Task Modal */}
        <Addtask
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onTaskSaved={handleTaskSaved}
          taskData={selectedTask}
        />

        {/* Current Date */}
        <p className="date text-secondary mb-3 text-xl">
          {formattedDate}
        </p>

        {/* =====================================================
            METRIC CARDS
        ===================================================== */}

        <div className="allcard-grid mb-3 ">

          {/* TOTAL TASKS */}
          <div className="card p-3  bg-[#13131E] text-white border-0 rounded-3">
            <h5 className="deshboardIcon bg-[#221E35] "><i class="fa-solid fa-list text-3xl   text-[#8B5CF6] "></i></h5>
            <h2 className="fs-1 fw-bold mb-1 ml-2!">
              {totalTasks}
            </h2>

            <p className="text-secondary small mb-0 ml-2!">
              TOTAL TASKS
            </p>

          </div>

          {/* IN PROGRESS */}
          <div className="card p-3  bg-[#13131E] text-white border-0 rounded-3">

            <h5 className="deshboardIcon bg-[#112633]">
              <span className="material-symbols-outlined text-4xl! text-[#00D3F3] ">
                directory_sync
              </span>

            </h5>
            <h2 className="fs-1 fw-bold mb-1 ml-2!">
              {inProgressTask}
            </h2>
            <p className="text-secondary small mb-0 ml-2!">
              IN PROGRESS
            </p>

          </div>

          {/* COMPLETED */}
          <div className="card p-3  bg-[#13131E] text-white border-0 rounded-3">
            <h5 className="deshboardIcon bg-[#11262A]">
              <span className="material-symbols-outlined text-4xl! text-[#00D492]">
                task_alt
              </span>
            </h5>
            <h2 className="fs-1 fw-bold mb-1 ml-2!">
              {completeTasks}
            </h2>

            <p className="text-secondary small mb-0 ml-2!">
              COMPLETED
            </p>

          </div>

          {/* DUE THIS WEEK */}
          <div className="card p-3 bg-[#13131E] text-white border-0 rounded-3">
            <h5 className="deshboardIcon bg-[#2B241B] ">
              <span className="material-symbols-outlined text-4xl! text-[#FFB900]">
                lock_clock
              </span>
            </h5>
            <h2 className="fs-1 fw-bold mb-1 ml-2!">
              {pendingTasks}
            </h2>

            <p className="text-secondary small mb-0 ml-2!">
              DUE THIS WEEK
            </p>

          </div>

        </div>

        {/* =====================================================
            CHARTS SECTION
        ===================================================== */}

        <div className="row g-3 mb-3">

          {/* WEEKLY ACTIVITY */}
          <div className="col-12 col-xl-7">

            <div className="p-3  bg-[#13131E] rounded-3 chart-card">

              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-1 mb-2">

                <h3 className="h5 mb-0 fw-bold text-nowrap text-[#8080A0]! ">
                  Weekly Activity
                </h3>

                <span className="text-secondary small text-nowrap text-lg!">
                  Last 7 days task progress
                </span>

              </div>


              <Barchart tasks={tasks} />

            </div>

          </div>

          {/* PRIORITY CHART */}
          <div className="col-12 col-xl-5">

            <div className="p-3  bg-[#13131E] rounded-3 chart-card text-center d-flex flex-column justify-content-between align-items-center">

              <h3 className="h5 fw-bold w-100 text-start text-[#8080A0]!">
                By Priority
              </h3>

              <DonutChart tasks={tasks} />

            </div>

          </div>

        </div>



      </main>
    </span>
  );
}

export default Dashboard;


