import React from 'react';

interface CompletionScreenProps {
  playAgain: () => void;
  exitToMenu: () => void;
  score: number;
  totalTime: number;
}

const CompletionScreen: React.FC<CompletionScreenProps> = ({ playAgain, exitToMenu, score, totalTime }) => {
  const formatTime = (time: number) => `${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, '0')}`;
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg text-center shadow-lg max-w-sm w-full">
        <h2 className="text-3xl font-bold mb-4">Game Complete!</h2>
        <p className="text-xl mb-6">Final Score: {score}/1000</p>
        <p className="text-lg mb-4">Total Time: {formatTime(totalTime)}</p>
        
        <button onClick={playAgain} className="button mb-4 w-full text-lg">Play Again</button>
        <button onClick={exitToMenu} className="button w-full text-lg bg-gray-700 text-white hover:bg-gray-600">Back to Menu</button>
      </div>
    </div>
  );
};

export default CompletionScreen;
