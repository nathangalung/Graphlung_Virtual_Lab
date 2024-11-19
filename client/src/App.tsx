import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Simulation from './pages/Simulation';
import Game from './pages/Game';
import Login from './pages/Login';
import GameMenu from './components/gameplay/GameMenu';
import ErrorBoundary from './components/ErrorBoundary';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Profile from './pages/Profile';
import { useAuth } from './components/auth/Context';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const AppContent = () => {
  const [isInGame, setIsInGame] = useState(false);
  const { isAuthenticated, user } = useAuth();

  const [stats, setStats] = useState({
    easy: { bestScore: 0, bestTime: "0:00", completions: 0 },
    medium: { bestScore: 0, bestTime: "0:00", completions: 0 },
    hard: { bestScore: 0, bestTime: "0:00", completions: 0 },
  });

  const startGame = (level: 'easy' | 'medium' | 'hard') => {
    setIsInGame(true);
  };
  
  const exitGame = () => {
    setIsInGame(false);
  };

  const updateStats = (level: 'easy' | 'medium' | 'hard', score: number, time: string) => {
    if (!isAuthenticated) return;
    setStats(prevStats => ({
      ...prevStats,
      [level]: {
        bestScore: Math.max(prevStats[level].bestScore, score),
        bestTime: prevStats[level].bestScore < score ? time : prevStats[level].bestTime,
        completions: prevStats[level].completions + 1
      }
    }));
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/profile" /> : <Login />} />
          <Route path="/signin" element={isAuthenticated ? <Navigate to="/profile" /> : <SignIn />} />
          <Route path="/signup" element={isAuthenticated ? <Navigate to="/profile" /> : <SignUp />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route
            path="/game"
            element={
              isInGame ? (
                <Game 
                  exitToMenu={exitGame} 
                  updateStats={updateStats}
                  isAuthenticated={isAuthenticated}
                />
              ) : (
                <GameMenu
                  startGame={startGame}
                  isEasyComplete={stats.easy.bestScore > 0}
                  userName={user?.username || "Guest"}
                  stats={stats}
                  isAuthenticated={isAuthenticated}
                />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
};

export default App;