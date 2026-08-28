import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App.jsx'
import HomePage from './components/homepage/HomePage.jsx';
import Deshboard from './components/deshboard/Deshboard.jsx';
import SignUp from './components/signup/SignUp.jsx';
import Login from './components/login/Login.jsx';
import Timer from './components/Timer/Timer.jsx';
import AddTask from './components/task/AddTask.jsx';

createRoot(document.getElementById('root')).render(

  <StrictMode>
    {/* <BrowserRouter> */}
      <App />
    {/* </BrowserRouter> */}
  </StrictMode>
)
