import React from "react";
import Home from './Components/Home.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { TimeSecondsProvider, TimeProvider, TimeMinutProvider, AnswerProvider, LoginProvider } from "./Components/ContextProvider/DataProvider.jsx";
import ExamPage from "./Components/ExamPage.jsx";
import Results from "./Components/Results.jsx";
import Login from "./Components/Login.jsx";
import ProtectRoutes from "./Components/ProtectRoutes.jsx";
import Error from "./Components/Error.jsx";
import AddNewQuestions from "./Components/AddNewQuestions.jsx";
import Registrate from "./Components/Registrate.jsx";
import './App.css'



function App() {
  return (
    <Router>
      <LoginProvider>
        <TimeProvider>
          <TimeMinutProvider>
            <TimeSecondsProvider>
              <AnswerProvider>
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route element={<ProtectRoutes />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/examPage" element={<ExamPage />} />
                    <Route path="/results" element={<Results />} />
                  </Route>
                  <Route path="/registrate" element={<Registrate />} />
                  <Route path="/addQuestions" element={<AddNewQuestions />}/>
                  <Route path="*" elemen={<Error />} />
                </Routes>
              </AnswerProvider>
            </TimeSecondsProvider>
          </TimeMinutProvider>
        </TimeProvider>
      </LoginProvider>
    </Router>
  );
}

export default App;
