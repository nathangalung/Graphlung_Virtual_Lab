import React, { useState } from 'react';
import GamePanel from '../components/gameplay/GamePanel';
import Level from '../components/gameplay/Level';
import CompletionScreen from '../components/gameplay/CompletionScreen';

interface GameProps {
  exitToMenu: () => void;
  updateStats: (level: 'easy' | 'medium' | 'hard', score: number, time: string) => void;
  isAuthenticated: boolean;
}

const Game: React.FC<GameProps> = ({ exitToMenu, updateStats, isAuthenticated }) => {
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [currentLevel] = useState<'easy' | 'medium' | 'hard'>('easy');

  const completeGame = (finalScore: number, timeInSeconds: number) => {
    const formattedTime = `${Math.floor(timeInSeconds / 60)}:${(timeInSeconds % 60).toString().padStart(2, '0')}`;
    setScore(finalScore);
    setTotalTime(timeInSeconds);
    setIsGameComplete(true);
    if (isAuthenticated) {
      updateStats(currentLevel, finalScore, formattedTime);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 pt-[70px]">
      <GamePanel exitToMenu={exitToMenu} />
      {!isAuthenticated && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <p className="font-bold">Playing as Guest</p>
          <p>Your progress won't be saved. <a href="/login" className="text-purple-600 hover:text-purple-800 underline">Login</a> to save your progress!</p>
        </div>
      )}
      {!isGameComplete ? (
        <Level 
          difficulty={currentLevel}
          onComplete={completeGame}
        />
      ) : (
        <CompletionScreen 
          playAgain={() => {
            setIsGameComplete(false);
            setScore(0);
            setTotalTime(0);
          }}
          exitToMenu={exitToMenu}
          score={score}
          totalTime={totalTime}
          isAuthenticated={isAuthenticated}
        />
      )}
    </div>
  );
};

export default Game;