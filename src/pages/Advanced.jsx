import React, { useState } from "react";

export default function Advanced({ navigate }) {
  const [showRules, setShowRules] = useState(true);
  const targetTimes = [5, 10, 15];
  const [currentTargetIndex, setCurrentTargetIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timerStart, setTimerStart] = useState(0);
  const [results, setResults] = useState([]);
  const [best, setBest] = useState(localStorage.getItem('advanced_best_score') || 0);
  const handleTimerButton = () => {
    // If game hasn't started or we're starting a new game
    if (!isPlaying && currentTargetIndex === 0) {
      setIsPlaying(true);
      setTimerStart(Date.now());
      setShowRules(false);
      return;
    }

    // Record split time
    const targetTime = targetTimes[currentTargetIndex];
    const elapsedTime = ((Date.now() - timerStart) / 1000).toFixed(2);
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
      const newResults = [...results, {
        targetTime: targetTimes[currentTargetIndex],
        elapsedTime,
        difference,
      }];
      const totalElapsedTime = newResults.reduce((total, result) => total + parseFloat(result.elapsedTime), 0);
      if (best === 0 || Math.abs(totalElapsedTime - 30) < Math.abs(best - 30)) {
        setBest(totalElapsedTime);
        localStorage.setItem('advanced_best_score', totalElapsedTime);
      }
      setIsPlaying(false);
      setResults(newResults);
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
    <div className="bg-black text-white h-screen flex justify-start items-center flex-col font-mono">
      <div onClick={() => navigate('/')} className="px-3 ml-auto text-3xl font-normal hover:cursor-pointer">x</div>
      <div className="flex flex-col justify-evenly h-full">
        <header className="w-screen max-h-96 h-full flex justify-between items-center flex-col">
          <h1 className="text-8xl pt-12 h-36">
            {!isPlaying && currentTargetIndex === 0 && "00.00"}
            {isPlaying && <div className="text-2xl text-center">
              Hint: Count "One Mississippi", "Two Mississippi", "Three Mississippi" ...
            </div >}
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
            className="text-xl rounded-full bg-white text-black p-6 w-48 font-bold hover:bg-gray-200"
          >
            {getButtonText()}
          </button>
          <h3>Personal best: {best}s</h3>

        </header>
        <section className="mt-4 px-3">
          {!isPlaying && results.length === targetTimes.length && (
            <div>
              <h2 className="text-xl font-bold mb-4 text-center">Results</h2>
              <div className="text-sm flex flex-row gap-10 align-middle justify-center">
                {results.map((result, index) => (
                  <div key={index} className="flex align-middle justify-center flex-col text-center">
                    <p>Target: {result.targetTime}s</p>
                    <p>Elapsed: {result.elapsedTime}s</p>
                    <p>Difference: {result.difference}s</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>


        <div className="w-screen mt-auto flex justify-between items-center">
          <button onClick={toggleRules}
            className="p-4 text-lg ml-auto">
            {showRules ? <></> : 'Show rules'}
          </button>
          <div className={`${showRules ? 'block' : 'hidden'} w-screen`}>
            <ul className="list-disc text-sm ml-8">
              <li>The game begins when you click the "Start" button.</li>
              <li>Estimate and stop the timer for 5, 10, and 15-second intervals one after the other.</li>
              <li>Press the "Split" button when you think the time has passed.</li>
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
        </div>
      </div>
    </div>
  );
}
