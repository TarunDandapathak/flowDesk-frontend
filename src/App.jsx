


import "./App.css";
import SignUp from "./components/signup/SignUp.jsx"
import Login from "./components/login/Login.jsx";
import Timer from "./components/Timer/Timer.jsx";
import AddTask from "./components/task/AddTask.jsx";
import HomePage from "./components/homepage/HomePage.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Deshboard from "./components/deshboard/Deshboard.jsx";
import { ViewTask } from "./components/viewtask/ViewTask.jsx";
import About from "./components/about/About.jsx";
import { Toaster } from "react-hot-toast";
import PageNotFound from "./components/pageNotFound/PageNotFound.jsx";
import Feedback from "./feedBack/Feedback.jsx";
import { TimerProvider } from "./components/Timer/TimerContext.jsx";
import PrivacyPolicy from "./components/privacy/PrivacyPolicy.jsx";
import TermsOfService from "./components/term&service/TermsOfService.jsx";
import Footer from "./Footer.jsx"

function App() {
  return (
    <>
    
      <TimerProvider>
        <BrowserRouter>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3500,

              style: {
                background: "#1E1B2E",
                color: "#F3F4F6",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                padding: "12px 16px",
                fontSize: "14px",
                minWidth: "320px",
                maxWidth: "500px",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
              },

              success: {
                iconTheme: {
                  primary: "#22C55E",
                  secondary: "#1E1B2E",
                },
              },
              error: {
                iconTheme: {
                  primary: "#EF4444",
                  secondary: "#1E1B2E",
                },
              },
            }}
          />
          <Routes>

            <Route path="/" element={<HomePage />}>

              <Route
                index
                element={<Navigate to="/app/deshboard" replace />}
              />

              <Route
                path="/app/deshboard"
                element={<Deshboard />}
              />

              <Route
                path="/app/tasks"
                element={<ViewTask />}
              />

              <Route
                path="/app/timer"
                element={<Timer />}
              />
              <Route path="/app/about" element={<About />} />
              <Route path="/app/feedback" element={<Feedback />} />
              <Route path="/app/policy" element={<PrivacyPolicy />} />
              <Route path="/app/term" element={<TermsOfService />} />
                <Footer />
            </Route>
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />


            <Route path="*" element={<PageNotFound />} />


          </Routes>
        
        </BrowserRouter>
      </TimerProvider>
    </>
  );
}

export default App;
