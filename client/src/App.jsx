import react from 'react';
import { useState } from 'react';
import Home from './Home'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import './App.css';
// import { Router } from 'express';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/signup" element={<SignupForm/>} />


      </Routes>
    </Router>
  );
}

export default App;
