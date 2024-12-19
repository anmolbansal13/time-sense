import React, { useState } from "react";

export default function Advanced() {
  const [showRules, setShowRules] = useState(false);
  const targetTimes = [5, 10, 15];
  const [currentTargetIndex, setCurrentTargetIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timerStart, setTimerStart] = useState(0);
  const [results, setResults] = useState([]);

  const handleTimerButton = () => {
    // If game hasn't started or we're starting a new game
    if (!isPlaying && currentTargetIndex === 0) {
      setIsPlaying(true);
      setTimerStart(Date.now());
      return;
    }

    // Record split time
    const elapsedTime = ((Date.now() - timerStart) / 1000).toFixed(2);
    const targetTime = targetTimes[currentTargetIndex];
    const difference = Math.abs(elapsedTime - targetTime).toFixed(2);

    setResults(prev => [...prev, {
      targetTime,
      elapsedTime,
      difference,
    }]);

    // Move to next target or end game
    if (currentTargetIndex < targetTimes.length - 1) {
      setCurrentTargetIndex(prev => prev + 1);
      setTimerStart(Date.now()); // Reset timer for next interval
    } else {
      setIsPlaying(false);
    }
  };

  const resetGame = () => {
    setIsPlaying(false);
    setCurrentTargetIndex(0);
    setTimerStart(0);
    setResults([]);
  };

  const getButtonText = () => {
    if (!isPlaying && currentTargetIndex === 0) return "START TIMER";
    if (isPlaying) return `SPLIT (${targetTimes[currentTargetIndex]}s)`;
    if (!isPlaying && results.length === targetTimes.length) return "PLAY AGAIN";
    return "SPLIT";
  };

  const toggleRules = () => setShowRules(prev => !prev);

  return (
    <div className="bg-black h-screen flex justify-between items-center flex-col text-white">
      <div className="w-screen h-auto flex justify-between items-center flex-col">
        <h1 className="text-8xl mt-12">
          {!isPlaying && currentTargetIndex === 0 && "00.00"}
          {isPlaying && "😊"}
          {!isPlaying && results.length > 0 && `${results[results.length - 1]?.elapsedTime}s`}
        </h1>

        <button
          onClick={() => {
            if (!isPlaying && results.length === targetTimes.length) {
              resetGame();
            } else {
              handleTimerButton();
            }
          }}
          className="text-xl rounded-full bg-white text-black p-6 w-48 font-bold mt-12"
        >
          {getButtonText()}
        </button>
        <section className="mt-12 px-3">
          {!isPlaying && results.length === targetTimes.length && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Results:</h2>
              <div className="flex flex-row gap-2">
                {results.map((result, index) => (
                  <div key={index} className="mb-4">
                    <p>Target: {result.targetTime}s</p>
                    <p>Elapsed: {result.elapsedTime}s</p>
                    <p>Difference: {result.difference}s</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>


      <rules className="w-screen flex justify-between items-center">
        <button onClick={toggleRules}
          className="p-4 text-lg ml-auto">
          {showRules ? <></> : 'Show rules'}
        </button>
        <div className={`${showRules ? 'block' : 'hidden'} w-screen`}>
          <ul className="list-disc ml-8">
            <li>The game starts when you click the "Start" button.</li>
            <li>You have to estimate time intervals of 5, 10, and 15 seconds.</li>
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
  );
}
