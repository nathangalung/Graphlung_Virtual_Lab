import { Link, useNavigate } from 'react-router-dom';

interface GameMenuProps {
  startGame: (level: 'easy' | 'medium' | 'hard') => void;
  isEasyComplete: boolean;
  userName: string;
  stats: {
    easy: { bestScore: number; bestTime: string; completions: number };
    medium: { bestScore: number; bestTime: string; completions: number };
    hard: { bestScore: number; bestTime: string; completions: number };
  };
  isAuthenticated: boolean;
}

// Change from const assignment to function declaration
function GameMenu({ startGame, isEasyComplete, userName, stats, isAuthenticated }: GameMenuProps) {
  const navigate = useNavigate();

  const handleStartGame = (level: 'easy' | 'medium' | 'hard') => {
    console.log('Starting game with level:', level);
    startGame(level);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 pt-[70px]">
      <h1 className="text-4xl font-bold mb-8">Hello, {userName}</h1>
      
      {!isAuthenticated && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-8 max-w-md">
          <p className="font-bold">Playing as Guest</p>
          <p>
            Your progress won't be saved.{' '}
            <Link to="/login" className="text-purple-600 hover:text-purple-800 underline">
              Login
            </Link>{' '}
            or{' '}
            <Link to="/signup" className="text-purple-600 hover:text-purple-800 underline">
              Sign Up
            </Link>{' '}
            to:
          </p>
          <ul className="list-disc ml-5 mt-2">
            <li>Save your progress</li>
            <li>Track your high scores</li>
            <li>Unlock higher difficulty levels</li>
            <li>Compare with other players</li>
          </ul>
        </div>
      )}

      {isAuthenticated && (
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Your Best Records</h2>
          <div className="space-y-2">
            {Object.entries(stats).map(([level, stat]) => (
              <p key={level} className="text-lg">
                <strong className="capitalize">{level} Level</strong> - 
                Best Score: {stat.bestScore}, 
                Best Time: {stat.bestTime}, 
                Completions: {stat.completions}/10
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <button 
          onClick={() => handleStartGame('easy')}
          className="button w-full"
        >
          Easy
        </button>
        <button 
          onClick={() => handleStartGame('medium')}
          className="button w-full"
          disabled={!isAuthenticated || !isEasyComplete}
        >
          {!isAuthenticated ? 'Login to Unlock' : 'Medium'}
        </button>
        <button 
          onClick={() => handleStartGame('hard')}
          className="button w-full"
          disabled={!isAuthenticated || !isEasyComplete}
        >
          {!isAuthenticated ? 'Login to Unlock' : 'Hard'}
        </button>
      </div>

      <button 
        onClick={() => navigate('/')}
        className="button mt-8"
      >
        Exit to Home
      </button>
    </div>
  );
};

export default GameMenu;