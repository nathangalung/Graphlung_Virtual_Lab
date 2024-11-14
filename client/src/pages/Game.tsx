import React, { useState } from 'react';
import Easy from '../components/gameplay/Easy'

const Game = () => {
  const [selectedLevel, setSelectedLevel] = useState('');
  const [isGameStarted, setIsGameStarted] = useState(false);

  const handleStartGame = () => {
    if (selectedLevel) {
      setIsGameStarted(true);
    } else {
      alert('Please select a level to start the game.');
    }
  };

  if (isGameStarted) {
    switch (selectedLevel) {
        case 'easy':
            return <Easy />;
        default:
            return null;
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Game Title */}
      <h1 className="text-4xl font-bold text-center mb-6">GraphKing</h1>

      {/* Video Section */}
      <div className="flex justify-center mb-6">
        <video
          className="w-full md:w-3/4 lg:w-1/2"
          controls
          loop
          autoPlay
          muted
        >
          <source src="path_to_your_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Level Selection */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold mb-4">Choose Difficulty Level</h2>
        <div className="flex justify-center gap-8">
          <button
            className={`px-4 py-2 rounded-full text-white font-semibold ${selectedLevel === 'easy' ? 'bg-[#2c003e]' : 'bg-purple-800'}`}
            onClick={() => setSelectedLevel('easy')}
          >
            Easy
          </button>
          <button
            className={`px-4 py-2 rounded-full text-white font-semibold ${selectedLevel === 'medium' ? 'bg-[#2c003e]' : 'bg-purple-800'}`}
            onClick={() => setSelectedLevel('medium')}
          >
            Medium
          </button>
          <button
            className={`px-4 py-2 rounded-full text-white font-semibold ${selectedLevel === 'hard' ? 'bg-[#2c003e]' : 'bg-purple-800'}`}
            onClick={() => setSelectedLevel('hard')}
          >
            Hard
          </button>
        </div>
      </div>

      {/* Start Button */}
      <div className="text-center">
        <button
          className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold"
          onClick={handleStartGame}
        >
          Start Game
        </button>
      </div>

      {/* Display a message after starting the game */}
      {isGameStarted && (
        <div className="mt-6 text-center text-xl text-green-600">
          <p>Game started! You selected: {selectedLevel} level.</p>
        </div>
      )}
    </div>
  );
};

export default Game;
