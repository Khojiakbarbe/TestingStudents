import React from "react";
import Home from './Components/Home.jsx'
import Navbar from "./Components/Navbar.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
