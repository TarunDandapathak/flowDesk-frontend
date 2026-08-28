import { useState } from "react";
import "../signup/SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { showSuccessToast, showErrorToast } from "../notification/Notify"

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const showPassword = () => {
    setShow((show) => !show);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);




    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/user/login",
        formData,
        {
          withCredentials: true,
        }
      );
      const fullName = response.data.user.fullName;

      const words = fullName.split(" ");

      const firstLetter = words[0][0];
      const lastLetter = words[1][0];

      localStorage.setItem("email", response.data.user.email);
      localStorage.setItem("nameFL", `${firstLetter + lastLetter}`);
      localStorage.setItem("name", response.data.user.fullName);
      // console.log("Login successful:", response.data);
      navigate("/app/deshboard");
      showSuccessToast("You Successfully Logged In...")
    } catch (err) {
      // console.log("Login failed:", err.response.data.message);
      showErrorToast(err?.response.data.message || "Something went wrong .Please Try Again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid login-container">
      <div className="row m-0 min-h-screen">
        {/* Left Section - Hero Visual */}
        <div className="left-section col-lg-6 d-none d-lg-flex flex-col justify-between p-10 xl:p-16">
          {/* Logo Header */}


          {/* Main Hero Content */}
          <div className="left-text  m-4 py-6 max-w-lg">
            <div className="d-flex align-items-center font-bold fs-4">
              <span className="material-symbols-outlined iconBolt me-3 d-flex align-items-center justify-content-center">
                bolt
              </span>
              FlowDesk
            </div>
            <h1 className="fw-bold text-4xl xl:text-5xl font-bold leading-tight mb-6 mt-3">
              Everything your <br />
              team needs to <br />
              <span className="text-[#38BDF8]">ship faster.</span>
            </h1>

            <p className="text-light opacity-75 fs-5 mt-3">
              Tasks, kanban boards, timers, and analytics — all in one focused
              workspace built for modern teams.
            </p>

            {/* Feature Checklist */}
            <ul className="flex flex-col gap-4 text-sm xl:text-base text-gray-200 mb-10">
              <li className="flex items-center gap-3 text-">
                <span className="material-symbols-outlined text-[#38BDF8] text-xl">
                  check_circle
                </span>
                Create and manage tasks

              </li>
              <li className="flex items-center gap-3 text-">
                <span className="material-symbols-outlined text-[#38BDF8] text-xl">
                  check_circle
                </span>
                Organize tasks into projects or categories
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#38BDF8] text-xl">
                  check_circle
                </span>
                Built-in Pomodoro focus timer
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#38BDF8] text-xl">
                  check_circle
                </span>
                Track task progress
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#38BDF8] text-xl">
                  check_circle
                </span>
                Smart task filtering and search
              </li>
            </ul>

            {/* Testimonial Card */}
            <div className="testimonial-card p-2 text-center  mt-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 ">
              <p className="text-gray-100 text-sm xl:text-base mb-4 leading-relaxed font-normal">
                "FlowDesk is our project .This is for learning full stack developement.Get more info. checkout
                <Link
                  to="/app/about"
                  className="text-[#261753] font-bold no-underline!"
                >
                  _About Page.
                </Link>
                "
              </p>

            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="right-section col-12 col-lg-6 flex flex-col items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md">
            <div className="d-lg-none d-flex align-items-center   justify-content-center font-bold fs-4 mb-4">
              <span className="material-symbols-outlined iconBolt me-2 d-flex align-items-center justify-content-center">
                bolt
              </span>
              FlowDesk
            </div>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
              <p className="text-gray-400 text-sm">
                Please enter your details to sign in
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="form flex flex-col items-center gap-4 w-full"
            >
              <input
                type="email"
                className="inputField px-4 w-full h-12 rounded-xl border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B5CF6]"
                name="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <span className="relative w-100">
                <input
                  type={show ? "text" : "password"}
                  className="inputField px-4 w-full h-12 rounded-xl border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B5CF6]"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span
                  onClick={showPassword}
                  className="material-symbols-outlined absolute top-0 right-0 cursor-pointer p-[12px]!">
                  {show ? "visibility" : "visibility_off"}
                </span>

              </span>
              <button
                type="submit"

                disabled={loading}
                className="bg-[#8B5CF6] text-white w-full h-12 font-bold rounded-xl mt-2 hover:bg-[#7c4dff] transition-colors disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <div className="flex items-center justify-center gap-2 mt-4 text-sm">
                <p className="mb-0 text-gray-400">Don't have an account?</p>
                <Link
                  to="/signup"
                  className="text-[#7B53EF] font-bold hover:underline"
                >
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;