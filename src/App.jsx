import React, { useState } from "react";
import { Routes, useNavigate } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Beginner from "./pages/Beginner.jsx";
import Advanced from "./pages/Advanced.jsx";
function App() {
  let navigate = useNavigate();

  return (
    <div classname="bg-black">
      <Routes>
        <Route path="/" element={<Home navigate={navigate} />} />
        <Route path="/beginner" element={<Beginner navigate={navigate} />} />
        <Route path="/advanced" element={<Advanced navigate={navigate} />} />
      </Routes>
    </div>
  );
}

export default App;
