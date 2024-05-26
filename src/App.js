import React, { useState } from 'react';
import { Route, NavLink, BrowserRouter, Routes } from 'react-router-dom';
import { CiLogin, CiCalendarDate } from "react-icons/ci";
import { FaChartLine, FaStickyNote, FaRegEdit } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import Modal from 'react-modal';

import Login from './components/login';
import Register from './components/register';
import Zalecenia from './components/Zalecenia';
import Calendar from './components/calendar';
import Start from './components/start';
import ProgressChart from './components/progresschart';
import CourseOfTreatment from './components/courseOfTreatment';
import ZaleceniaEdit from './components/zaleceniaEdit';

import './App.css';
import logo from './logo.png'; 

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul className="nav-list">
            <div className="nav-main">
              <li><NavLink to="/start"><IoHomeOutline/> Strona Główna</NavLink></li>  
              <li><NavLink to="/zalecenia"><FaStickyNote /> Zalecenia</NavLink></li>
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Zalecenia Modal"
      >
        <h2>Zalecenia</h2>
        <button onClick={closeModal}>Zamknij</button>
      </Modal>
      <Routes>
        <Route path="/start" element={< Start/>} />  
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