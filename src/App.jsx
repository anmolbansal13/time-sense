import React, { useState } from "react";
import { Routes, useNavigate } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Beginner from './pages/Beginner.jsx';
import Advanced from './pages/Advanced.jsx';
function App() {
  let navigate = useNavigate();
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameMode, setGameMode] = useState("beginner");

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            isGameStarted={isGameStarted}
            setIsGameStarted={setIsGameStarted}
            gameMode={gameMode}
            setGameMode={setGameMode}
            navigate={navigate}
          />
        }
      />

      <Route path="/beginner" element={<Beginner />} />
      <Route path="/advanced" element={<Advanced />} />
    </Routes>
  );
}

export default App;
