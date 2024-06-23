import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuizPage from './QuizPage';
import Question from './Question';
import LoginPage from './Login';
import AdminPannel from './AdminPanel';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPannel />} />
        {/* <Route path="/" element={<LoginPage />} /> */}
        {/* <Route path="/student" element={<QuizPage />} /> */}
      </Routes>
    </Router>
  )
}

export default App