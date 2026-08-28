import { useState } from 'react';
import './HomePage.css';
import Navbar from "../../Navbar.jsx";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { showSuccessToast, showErrorToast } from "../notification/Notify";
import { MessageCircleMore } from 'lucide-react';
//edited
import { useTimer } from "../Timer/TimerContext.jsx";

function HomePage() {
  //edited
  const { pauseTimer } = useTimer();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  // const location = useLocation();
  const email = localStorage.getItem("email");
  const nameFL = localStorage.getItem("nameFL");
  const name = localStorage.getItem("name");

  // const { email, nameFL, name } = location.state || {};

  const handleLogout = async (e) => {
    e.stopPropagation();
    try {
      pauseTimer();

      await axios.get("http://localhost:8080/api/auth/user/logout", {
        withCredentials: true
      });
      //edited
      localStorage.removeItem('timer_end_time');
      localStorage.removeItem('timer_running');
      localStorage.removeItem("nameFL");
      localStorage.removeItem("timer_mode");
      localStorage.removeItem("timer_session")
      localStorage.removeItem("timer_time_left")
      localStorage.removeItem("timer_running");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      showSuccessToast("Logged out successfully");
      navigate("/login");
    } catch (err) {
      showErrorToast(err.response?.data?.message || "Logout failed. Please try again!");
    }
  };

  return (
    <div className='dashboard-container text-white relative' onClick={() => setOpen(false)}>
      {/* Top Navbar Header */}
      <header className='top-navbar-wrapper border-b border-gray-800'>
        <Navbar />
      </header>

      {/* Sub-Header */}
      <div className='sub-header-bar flex justify-between items-center px-4 bg-[#13131E] border-b border-gray-700 h-[4rem] relative'>
        <div className="flex items-center font-bold text-xl dashboard-logo ">
          <span className="material-symbols-outlined iconBolt me-3 flex items-center justify-center">
            bolt
          </span>
          FlowDesk
        </div>

        {/* User Profile Area */}
        <div className="relative flex items-center z-[501]">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((prev) => !prev);
            }}
            className="icon text-white"
          >
            {nameFL}
          </button>

          {open && (
            <div className="profile-container mt-2" onClick={(e) => e.stopPropagation()}>
              <ul className="list-none m-0 p-0 flex flex-col gap-2">
                <li className='profile-card p-2 text-white font-medium border-b border-gray-700 pb-2'>
                  <i className="fa-solid fa-user me-2"></i>
                  {name}
                </li>
                <li className='profile-card px-2 py-1 text-gray-400 text-sm break-all'>
                  <i className="fa-solid fa-envelope me-2"></i>
                  {email}
                </li>
                <li
                  onClick={handleLogout}
                  className='profile-card p-2 text-red-400 hover:bg-red-500/10 rounded cursor-pointer logout font-semibold transition-colors mt-1'
                >
                  <i className="fa-solid fa-right-from-bracket me-2"></i>
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Main Body Layout */}
      <div className='container-fluid px-2 relative z-10'>
        <div className="row">
          <aside className='d-none d-md-block col-md-3 col-lg-2 border-end border-secondary border-opacity-25 pe-3 m-0 bg-[#13131E]'>
            <ul className='nav-list list-unstyled d-flex flex-column gap-3 fs-5 mt-3'>
              <li>
                <NavLink to="/app/deshboard" className="nav-link-custom">
                  <span className="material-symbols-outlined">dashboard</span>
                  <span>Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/app/tasks" className="nav-link-custom">
                  <i className="fa-solid fa-list-check"></i>
                  <span>Tasks</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/app/timer" className="nav-link-custom">
                  <span className="material-symbols-outlined">timer</span>
                  <span>Timer</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/app/about" className="nav-link-custom">
                  <span className="material-symbols-outlined">info</span>
                  <span>About</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/app/feedback" className="nav-link-custom">
                  {/* <span className="material-symbols-outlined">info</span> */}
                  <MessageCircleMore />
                  <span>Feedback</span>
                </NavLink>
              </li>
            </ul>
          </aside>

          <main className="main-content col">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default HomePage;