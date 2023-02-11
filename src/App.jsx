import React from "react";
import Home from './Components/Home.jsx'
import Navbar from "./Components/Navbar.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { TimeSecondsProvider, TimeProvider, TimeMinutProvider, AnswerProvider } from "./Components/ContextProvider/DataProvider.jsx";

import ExamPage from "./Components/ExamPage.jsx";
import Results from "./Components/Results.jsx";

import './App.css'


function App() {
  return (
    <Router>
      <TimeProvider>
        <TimeMinutProvider>
          <TimeSecondsProvider>
            <AnswerProvider>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/examPage" element={<ExamPage />} />
                <Route path="/results" element={<Results />} />
              </Routes>
            </AnswerProvider>
          </TimeSecondsProvider>
        </TimeMinutProvider>
      </TimeProvider>
    </Router>
  );
}

export default App;
