import react from 'react';
import { useState } from 'react';
import Home from './Home'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import './App.css';
import FileShare  from './FileShare';
// import { Router } from 'express';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/signup" element={<SignupForm/>} />
        <Route path="/api/fileshare" element={<FileShare/>} />


      </Routes>
    </Router>
  );
}

export default App;
