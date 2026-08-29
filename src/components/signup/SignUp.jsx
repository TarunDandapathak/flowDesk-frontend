import "./SignUp.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { showSuccessToast, showErrorToast } from "../notification/Notify";


function SignUp() {
  const API_URL = "https://flow-desk-backend-ten.vercel.app";

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    otp: "",
  });

  const showPassWord = () => {
    setShow((show => !show));
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const data = {
        fullName: `${formData.firstname} ${formData.lastname.trim()}`,
        email: formData.email,
        password: formData.password,
      };

      await axios.post(
        `${API_URL}/api/auth/user/register`,
        data,
        { withCredentials: true }
      );

      setStep(2);

    } catch (err) {
      // console.log(err.response?.data?.message || "Registration failed");
      showErrorToast(err.response?.data?.message || "Registration failed")
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const verifyOtp = {
        email: formData.email,
        otp: formData.otp,
      };

      await axios.post(
        `${API_URL}/api/auth/user/otp-verify`,
        verifyOtp,
        { withCredentials: true }
      );
      localStorage.setItem("email", formData.email);
      localStorage.setItem("nameFL", `${formData.firstname[0] + formData.lastname[0]}`,);
      localStorage.setItem("name", `${formData.firstname} ${formData.lastname}`);

      navigate("/app/deshboard");
      showSuccessToast("You Successfully Register..")
    } catch (err) {
      // console.log(err.response?.data?.message || "Verification failed");
      if (err.response.data.message.length > 25) {
        showErrorToast("Verification failed.")
      } else {
        showErrorToast(err.response.data?.message || "Verification failed")
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column">
      <div className="row flex-grow-1 g-0">
        {/* left section  */}
        <div className="left-section col-lg-6 d-none d-lg-flex flex-column justify-content-evenly p-4 p-xl-5">

          <div className="d-flex align-items-center font-bold fs-4">
            <span className="material-symbols-outlined iconBolt me-3 d-flex align-items-center justify-content-center">
              bolt
            </span>
            FlowDesk
          </div>

          <div className="mt-5 pe-xl-5">
            <h1 className="fw-bold display-5 mb-4">
              Start shipping <br />
              <span className="text-[#53EAFD]">better work</span> <br />
              today.
            </h1>
            <p className="text-light opacity-75 fs-5 mt-5">
              Join thousands of engineers, designers, and product teams who
              use FlowDesk to stay in flow.
            </p>

            {/* Stats Cards */}
            <div className="row g-3 mt-5">

              <div className="col-4">
                <div className="rating d-flex flex-column justify-content-center align-items-center p-3 text-center">
                  <h4 className="fw-bold mb-0">12K+</h4>
                  <p className="mb-0 text-light opacity-75 small">Teams</p>
                </div>
              </div>


              <div className="col-4">
                <div className="rating d-flex flex-column justify-content-center align-items-center p-3 text-center">
                  <h4 className="fw-bold mb-0">98%</h4>
                  <p className="mb-0 text-light opacity-75 small">Retention</p>
                </div>
              </div>

              <div className="col-4">
                <div className="rating d-flex flex-column justify-content-center align-items-center p-3 text-center">
                  <h4 className="fw-bold mb-0">4.9  ★</h4>
                  <p className="mb-0 text-light opacity-75 small">Rating</p>
                </div>
              </div>
            </div>

            {/* User Avatars */}
            <div className="d-flex align-items-center mt-5">
              <div className="user-icon d-flex me-3">
                <div className="Customericon circle bg-[#FF2056]! d-flex items-center justify-center">
                  TD
                </div>
                <div className="Customericon circle bg-[#00B8DB]! d-flex items-center justify-center">
                  BB
                </div>
                <div className="Customericon circle bg-[#FE9A00]! d-flex items-center justify-center">
                  GK
                </div>
                <div className="Customericon circle bg-[#8E51FF]! d-flex items-center justify-center">
                  SD
                </div>
              </div>
              <p className="mb-0 text-light opacity-75">
                2,400 people joined this month
              </p>
            </div>
          </div>

        </div>

        {/* Right Section */}
        <div className="right-section col-12 col-lg-6 d-flex flex-column justify-content-center align-items-center p-4 p-sm-5">
          <div className="w-100 max-w-md">
            {/* Header branding for small devices */}
            <div className="d-lg-none d-flex align-items-center   justify-content-center font-bold fs-4 mb-4">
              <span className="material-symbols-outlined iconBolt me-2 d-flex align-items-center justify-content-center">
                bolt
              </span>
              FlowDesk
            </div>

            <div className="text-center mb-4">
              <h1 className="fs-2 fw-bold text-white mb-2">
                {step === 1 ? "Create your account" : "Enter Verification Code"}
              </h1>
              <p className="text-gray-400">
                {step === 1
                  ? "Free forever, no credit card required"
                  : `We sent a code to ${formData.email}`}
              </p>
            </div>

            {step === 1 ? (
              <form
                autoComplete="off"
                onSubmit={handleSubmit}
                className="d-flex flex-column gap-3"
              >
                <input
                  type="text"
                  className="inputField w-100"
                  name="firstname"
                  placeholder="First Name"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  className="inputField w-100"
                  name="lastname"
                  placeholder="Last Name"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  className="inputField w-100"
                  name="email"
                  placeholder="Work Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <span className="relative w-100">
                  <input
                    type={show ? "text" : "password"}
                    className="inputField w-100"
                    name="password"
                    placeholder="Create Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <span
                    onClick={showPassWord}
                    className="material-symbols-outlined text-[#ffffff]! absolute top-0 right-0 cursor-pointer p-[12px]! ">
                    {show ? "visibility" : "visibility_off"}
                  </span>
                </span>

                <button
                  type="submit"
                  disabled={loading}
                  className="submitBtn bg-[#8B5CF6] hover:bg-[#7C3AED] text-white w-100 h-[3rem] rounded-[12px] font-semibold mt-2 transition-all"
                >
                  {loading ? "Sending OTP..." : "Get OTP Code"}
                </button>
              </form>
            ) : (
              <form
                onSubmit={handleVerifyOtp}
                autoComplete="off"
                className="d-flex flex-column gap-3"
              >
                <input
                  type="text"
                  className="inputField w-100 text-center tracking-widest fs-5"
                  name="otp"
                  placeholder="Enter 6-digit OTP"
                  value={formData.otp}
                  onChange={handleChange}
                  maxLength={6}
                  autoComplete="one-time-code"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="submitBtn bg-[#8B5CF6] hover:bg-[#7C3AED] text-white w-100 h-[3rem] rounded-[12px] font-semibold mt-2 transition-all"
                >
                  {loading ? "Verifying..." : "Verify & Create Account"}
                </button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-gray-400 text-sm mt-2 hover:underline bg-transparent border-0"
                >
                  Change Email / Back
                </button>
              </form>
            )}

            <div className="d-flex align-items-center justify-content-center gap-2 mt-4">
              <p className="mb-0 text-gray-400">Already have an account?</p>
              <Link
                to="/login"
                className="text-[#7B53EF] font-bold hover:underline"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;