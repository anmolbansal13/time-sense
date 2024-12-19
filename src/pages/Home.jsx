import React from 'react'
import { useRef, useEffect } from 'react';
export default function Home({ navigate }) {

  function startBeginnerMode() {
    navigate('/beginner');
  }
  function startAdvancedMode() {
    navigate('/advanced');
  }

  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Letters and settings
    let letters = "⏱︎";
    letters = letters.split("");

    const fontSize = 30;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0f0";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        drops[i]++;

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }
      }
    };

    const interval = setInterval(draw, 56);

    return () => clearInterval(interval);
  }, []);


  return (
    <>
      <canvas ref={canvasRef} className='h-screen w-screen fixed z-0 top-0 left-0'></canvas>
      <div className="w-screen h-screen flex justify-evenly items-center flex-col z-10 relative text-white">
        <h1 className="text-6xl text-center font-bold px-3">
          How's your sense of TIME?
        </h1>
        <div className="flex flex-col text-4xl gap-8 font-medium">
          <h3 className='text-3xl'>Game Modes</h3>
          <button className='relative p-4 overflow-hidden rounded-full bg-black '
            onClick={startBeginnerMode}>
            <span className='absolute inset-0 border-4 rounded-full hover:border-dashed border-white'></span>
            Beginner
          </button>
          <button className='relative p-4 overflow-hidden rounded-full bg-black'
            onClick={startAdvancedMode}>
            <span className='absolute inset-0 border-4 rounded-full hover:border-dashed border-white'></span>
            Advanced
          </button>
        </div>
      </div>
    </>
  )

}
