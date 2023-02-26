import React from "react";
import Home from './Components/Home.jsx'
import AdminPage from "./Components/AdminPage.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { TimeSecondsProvider, TimeProvider, TimeMinutProvider, AnswerProvider, LoginProvider } from "./Components/ContextProvider/DataProvider.jsx";
import ExamPage from "./Components/ExamPage.jsx";
import Results from "./Components/Results.jsx";
import Login from "./Components/Login.jsx";
import ProtectRoutes from "./Components/ProtectRoutes.jsx";
import Error from "./Components/Error.jsx";
import AddNewQuestions from "./Components/AddNewQuestions.jsx";
import Registrate from "./Components/Registrate.jsx";
import DeletePage from "./Components/DeletePage.jsx";
import NewQuestions from "./Components/NewQuestions.jsx";
import ExamPage2 from "./Components/ExamPage2.jsx";
import Details from "./Components/Details.jsx";

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
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/registrate" element={<Registrate />} />
                    <Route path="/addQuestions" element={<AddNewQuestions />} />
                    <Route path="/newQuestions" element={<NewQuestions />} />
                    <Route path="/deleteQuestions" element={<DeletePage />} />
                    <Route path="/deleteQuestions/:id" element={<Details />} />
                    <Route path="/examPage2" element={<ExamPage2 />} />
                  </Route>
                  <Route path="/*" elemen={<Error />} />
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
