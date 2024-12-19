import React, { useState } from "react";
import { Routes, useNavigate } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Beginner from './pages/Beginner.jsx';
import Advanced from './pages/Advanced.jsx';
function App() {
  let navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<Home navigate={navigate} />} />
      <Route path="/beginner" element={<Beginner />} />
      <Route path="/advanced" element={<Advanced />} />
    </Routes>
  );
}

export default App;
