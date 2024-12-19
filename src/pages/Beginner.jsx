import React from "react";
import { useState } from "react";

export default function Beginner({ navigate }) {
  const [showRules, setShowRules] = useState(true);
  const toggleRules = () => {
    setShowRules((prevShowRules) => !prevShowRules);
  };
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timerStart, setTimerStart] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [best, setBest] = useState(
    localStorage.getItem("beginner_best_score") || 0
  );
  const toggleStartEnd = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      setIsCompleted(false);
      setTimerStart(Date.now());
      setAccuracy(0);
      setShowRules(false);
    } else {
      setIsPlaying(false);
      setIsCompleted(true);
      let elapsed = ((Date.now() - timerStart) / 1000).toFixed(2);
      setAccuracy(elapsed);
      if (best === 0 || Math.abs(elapsed - 10) < Math.abs(best - 10)) {
        setBest(elapsed);
        localStorage.setItem("beginner_best_score", elapsed);
      }
    }
  };
  return (
    <div className="bg-black text-white h-screen flex justify-start items-center flex-col font-mono">
      <div
        onClick={() => navigate("/")}
        className="px-3 ml-auto text-3xl font-normal hover:cursor-pointer"
      >
        x
      </div>
      <div className="flex flex-col justify-evenly h-full">
        <header className="w-screen max-h-96 h-full flex justify-between items-center flex-col">
          <h1 className="text-8xl pt-12 h-36">
            {!isPlaying && !isCompleted && "00.00"}
            {isPlaying && (
              <div className="text-2xl text-center">
                Hint: Count "One Mississippi", "Two Mississippi", "Three
                Mississippi" ...
              </div>
            )}
            {!isPlaying && isCompleted && accuracy + "s"}
          </h1>
          <button
            onClick={toggleStartEnd}
            className="text-xl rounded-full bg-white text-black p-6 w-48 font-bold hover:bg-gray-200"
          >
            {isPlaying ? "STOP TIMER" : "START TIMER"}
          </button>
          <h3>Personal best: {best}s</h3>
        </header>

        <div className="w-screen mt-auto flex justify-between items-center">
          <button onClick={toggleRules} className="p-4 text-lg ml-auto">
            {showRules ? <></> : "Show rules"}
          </button>
          <div className={`${showRules ? "block" : "hidden"} w-screen`}>
            <ul className="list-disc text-sm ml-8">
              <li>The game begins when you click the "Start" button.</li>
              <li>You have to estimate a time interval of 10 seconds.</li>
              <li>
                Press the "Stop" button when you think the time has passed.
              </li>
            </ul>
            <footer className="flex justify-between items-center bottom-0 ">
              <h2 className="text-2xl font-bold">Rules to Play</h2>
              <button onClick={toggleRules} className="p-4 text-lg">
                {showRules ? "Hide rules" : <></>}
              </button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
