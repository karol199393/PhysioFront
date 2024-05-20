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


function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul className="nav-list">
            <div className="nav-main">
              <li><NavLink to="/start">Start</NavLink></li>  
              <li><NavLink to="/zalecenia">Zalecenia</NavLink></li>
              <li><NavLink to="/progresschart">Przebieg Leczenia</NavLink></li>  
              <li><NavLink to="/calendar">Kalendarz</NavLink></li>   
            </div>
            <img src={logo} alt="Logo" className="center-logo" /> 
            <div className="nav-auth">
              <li><NavLink to="/login">Logowanie</NavLink></li>   
              <li><NavLink to="/register">Rejestracja</NavLink></li>   
            </div>
          </ul>
        </nav> 
      </div>
      <Routes>
        <Route path="/start" element={< Start/>} />  
        <Route path="/training" element={<TrainingComponent />} />
        <Route path="/zalecenia" element={<Zalecenia />} />
        <Route path="/progresschart" element={<ProgressChart />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;