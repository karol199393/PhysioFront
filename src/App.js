import React from 'react';
import TrainingComponent from './components/Zalecenia';
import './App.css';
import { Route, NavLink, BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Zalecenia from './components/Zalecenia';
import Calendar from './components/calendar';
import Start from './components/start';
import logo from './logo.png'; 
import ProgressChart from './components/progresschart';
import CourseOfTreatment from './components/courseOfTreatment';
import ZaleceniaEdit from './components/zaleceniaEdit';
import { CiLogin } from "react-icons/ci";
import { FaChartLine } from "react-icons/fa";
import { FaRegNoteSticky } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";


function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul className="nav-list">
            <div className="nav-main">
              <li><NavLink to="/start"><IoHomeOutline/> Strona Główna</NavLink></li>  
              <li><NavLink to="/zalecenia"><FaRegNoteSticky /> Zalecenia</NavLink></li>
              <li><NavLink to="/zaleceniaEdit"><FaRegEdit /> Edytuj Zalecenie</NavLink></li>
              <li><NavLink to="/progresschart"><FaChartLine /> Przebieg Leczenia</NavLink></li>
              <li><NavLink to="/courseOfTreatment"><FaRegEdit /> Dodaj Parametry Leczenia</NavLink></li>  
              <li><NavLink to="/calendar"> <CiCalendarDate /> Kalendarz</NavLink></li>   
            </div>
            <img src={logo} alt="Logo" className="center-logo" /> 
            <div className="nav-auth">
              <li><NavLink to="/login"><CiLogin /> Logowanie</NavLink></li>   
              <li><NavLink to="/register"> <VscAccount /> Rejestracja</NavLink></li>   
            </div>
          </ul>
        </nav> 
      </div>
      <Routes>
        <Route path="/start" element={< Start/>} />  
        <Route path="/training" element={<TrainingComponent />} />
        <Route path="/zalecenia" element={<Zalecenia />} />
        <Route path="/zaleceniaEdit" element={<ZaleceniaEdit />} />
        <Route path="/progresschart" element={<ProgressChart />} />
        <Route path="/courseOfTreatment" element={< CourseOfTreatment />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;