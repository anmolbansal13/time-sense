import React from "react";
import { useState } from 'react';

export default function Beginner() {
  const [showRules, setShowRules] = useState(false);
  const toggleRules = () => {
    setShowRules(prevShowRules => !prevShowRules);
  }
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timerStart, setTimerStart] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [best, setBest] = useState(localStorage.getItem('beginner_best_score') || 0);
  const toggleStartEnd = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      setIsCompleted(false);
      setTimerStart(Date.now());
      setAccuracy(0);
    } else {
      setIsPlaying(false);
      setIsCompleted(true);
      let elapsed = ((Date.now() - timerStart) / 1000).toFixed(2);
      setAccuracy(elapsed);
      if (best === 0 || Math.abs(elapsed - 10) < Math.abs(best - 10)) {
        setBest(elapsed);
        localStorage.setItem('beginner_best_score', elapsed);
      }
    }
  }
  return (
    <div className="bg-black text-white h-screen flex justify-between items-center flex-col">
      <header className="w-screen h-96 flex justify-between items-center flex-col">
        <h1 className="text-8xl mt-12">
          {!isPlaying && !isCompleted && '00.00'}
          {isPlaying && '😊'}
          {(!isPlaying && isCompleted) && accuracy + 's'}
        </h1>
        <button onClick={toggleStartEnd}
          className="text-xl rounded-full bg-white text-black p-6 w-48 font-bold">
          {isPlaying ? 'STOP TIMER' : 'START TIMER'}
        </button>
        <h3>Personal best: {best}s</h3>
      </header>


      <rules className="w-screen flex justify-between items-center">
        <button onClick={toggleRules}
          className="p-4 text-lg ml-auto">
          {showRules ? <></> : 'Show rules'}
        </button>
        <div className={`${showRules ? 'block' : 'hidden'} w-screen`}>
          <ul className="list-disc ml-8">
            <li>The game starts when you click the "Start" button.</li>
            <li>You have to estimate a time interval of 10 seconds.</li>
            <li>Press the "Stop" button when you think the time has elapsed.</li>
          </ul>
          <footer className="flex justify-between items-center bottom-0 ">
            <h2 className="text-2xl font-bold">
              Rules to Play
            </h2>
            <button onClick={toggleRules}
              className="p-4 text-lg">
              {showRules ? 'Hide rules' : <></>}
            </button>
          </footer>
        </div>

      </rules>
    </div>
  )
}
