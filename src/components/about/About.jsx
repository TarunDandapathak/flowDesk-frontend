import React from "react";
import "./About.css";
import { Link } from "react-router-dom";


function About() {
  return (
    <div className="about-page">

      <section className="what-we-do">
        <div className="what-left">
          <h2> <i className="fa-solid fa-bullseye"></i> What We Do</h2>

          <p>
            Our platform helps users manage their tasks, projects,
            and daily activities in a smarter way.
          </p>

          <ul className="flex flex-col  text-sm xl:text-base text-gray-200 ">
            <li className="flex items-center gap-3 text-xl m-0!">
              <span className="material-symbols-outlined text-[#38BDF8] text-xl">
                check_circle
              </span>
              Create and manage tasks

            </li>
            <li className="flex items-center gap-3 text-">
              <span className="material-symbols-outlined text-[#38BDF8] text-xl m-0!">
                check_circle
              </span>
              Organize tasks into projects or categories
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#38BDF8] text-xl m-0!">
                check_circle
              </span>
              Built-in Pomodoro focus timer
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#38BDF8] text-xl m-0!">
                check_circle
              </span>
              Track task progress
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#38BDF8] text-xl m-0!">
                check_circle
              </span>
              Smart task filtering and search
            </li>
          </ul>
        </div>

        <div className="features">
          <h2>Key Features</h2>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">☷</div>
              <h3>Task Management</h3>
              <p>
                Create, edit, assign, and organize tasks from a
                centralized dashboard.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><i className="fa-solid fa-calendar-days"></i></div>
              <h3>Priority & Deadlines</h3>
              <p>
                Set task priorities and due dates to make sure
                important work is completed on time.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><i className="fa-solid fa-chart-line"></i></div>
              <h3>Progress Tracking</h3>
              <p>
                Track tasks from planning to completion and get
                a clear view of your progress.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><i className="fa-solid fa-folder folder-icon"></i></div>
              <h3>Project Organization</h3>
              <p>
                Organize related tasks into projects and keep
                your work structured.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><i className="fa-solid fa-table-cells-large"></i></div>
              <h3>Simple Dashboard</h3>
              <p>
                View pending, completed, and upcoming tasks
                easily in one place.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><i className="fa-solid fa-bell"></i></div>
              <h3>Reminders & Alerts</h3>
              <p>
                Get timely reminders and alerts so you never
                miss an important task.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>

        <div className="steps">
          <div className="step">
            <div className="step-icon">+</div>
            <h3>1. Create a Task</h3>
            <p>
              Add a task with title, description, priority,
              and deadline.
            </p>
          </div>

          <div className="step">
            <div className="step-icon">
              <i className="fa-solid fa-folder folder-icon"></i></div>
            <h3>2. Organize</h3>
            <p>
              Assign tasks to projects or categories and
              arrange them properly.
            </p>
          </div>

          <div className="step">
            <div className="step-icon"><i className="fa-solid fa-chart-line"></i></div>
            <h3>3. Track Progress</h3>
            <p>
              Monitor the status of each task as work
              progresses.
            </p>
          </div>

          <div className="step">
            <div className="step-icon">✓</div>
            <h3>4. Complete & Review</h3>
            <p>
              Mark tasks as completed and review your
              overall productivity.
            </p>
          </div>
        </div>
      </section>

      <section className="info-section">

        <div className="info-card choose">
          <h2><i className="fa-solid fa-shield-halved"></i>  Why Choose Us ?</h2>

          <p>
            We provide a clean, simple, and user-friendly
            experience. Manage all your tasks in one place,
            save time, stay organized, and focus on what
            matters most.
          </p>

        </div>

        <div className="info-card vision">
          <h2><i className="fa-solid fa-eye"></i>   Our Vision</h2>

          <p>
            We envision a smarter and more efficient way of
            managing work where users can plan confidently,
            stay organized, and achieve their goals with
            less effort.
          </p>
        </div>

        <div className="info-card future">
          <h2><i className="fa-solid fa-rocket"></i>  Future Goals</h2>

          <p>
            We plan to continuously improve the platform
            with new features such as enhanced collaboration,
            notifications, detailed reports, calendar
            integration, and smart automation.
          </p>
        </div>

      </section>

      <section className="team-section">
        <h2>Our Team</h2>

        <div className="team-grid">

          <div className="team-card">
            <div className="avatar">TD</div>
            <div>
              <h3> Tarun Dandapathak </h3>
              <p> Backend Developer </p>

              <div className="socials">
                <div className="linkedin-icon cursor-pointer">
                  <a href="https://www.linkedin.com/in/tarun-dandapathak-a0b15b37a/" target="_blank" rel="noopener noreferrer">
                    <i class="fa-brands fa-linkedin"></i>
                  </a>
                </div>

                <div className="twitter-icon cursor-pointer">
                  <a href="https://github.com/TarunDandapathak" target="_blank" rel="noopener noreferrer">
                    <i class="fa-brands fa-square-github"></i>
                  </a>
                </div>

                <div className="email-icon cursor-pointer">
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=tarundandapathak25@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i class="fa-solid fa-square-envelope"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="team-card">
            <div className="avatar">BB</div>
            <div>
              <h3> Bristi Rani Bera </h3>
              <p> Frontend Developer </p>

              <div className="socials">
                <div className="linkedin-icon cursor-pointer">
                  <a href="/linkedin" target="_blank" rel="noopener noreferrer">
                    <i class="fa-brands fa-linkedin"></i>
                  </a>
                </div>

                <div className="twitter-icon cursor-pointer">
                  <i class="fa-brands fa-square-github"></i>
                </div>

                <div className="email-icon cursor-pointer">
                  <span>
                    <i class="fa-solid fa-square-envelope"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="cta-section">
        <div>
          <h2>Please share your feedback with us.</h2>
          <p> Your response helps us improve our service.</p>
        </div>

        <Link to="/app/feedback">
          <button >
            Feedback Form →
          </button>
        </Link>
      </section>

    </div>
  );
}

export default About;