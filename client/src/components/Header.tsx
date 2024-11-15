// src/components/Header.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './auth/Context';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="bg-[#2c003e] text-white fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="container mx-auto px-4 h-[70px] flex justify-between items-center">
        <h1 className="text-2xl font-black-ops">Graphlung Virtual Lab</h1>
        <nav>
          <div 
            className="md:hidden text-2xl cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </div>
          <ul className={`nav-links ${isMenuOpen ? 'block' : 'hidden'} md:flex`}>
            {/* Home Navigation */}
            <li className="dropdown relative group">
              <Link to="/" className="block px-6 py-4 hover:bg-purple-900">
                HOME
              </Link>
            </li>
            {/* Simulation Navigation */}
            <li className="dropdown relative group">
              <Link to="/simulation" className="block px-6 py-4 hover:bg-purple-900">
                SIMULATION
              </Link>
            </li>
            {/* Game Navigation */}
            <li className="dropdown relative group">
              <Link to="/game" className="block px-6 py-4 hover:bg-purple-900">
                GAME
              </Link>
            </li>
            {/* Auth Navigation */}
            {isAuthenticated ? (
              <li className="dropdown relative group">
                <Link to="/profile" className="block px-6 py-4 hover:bg-purple-900">
                  {user?.username}
                </Link>
                <ul className="dropdown-content">
                  <li><Link to="/profile" className="block px-4 py-2 hover:bg-purple-800">Profile</Link></li>
                  <li><button onClick={logout} className="w-full text-left px-4 py-2 hover:bg-purple-800">Logout</button></li>
                </ul>
              </li>
            ) : (
              <li className="dropdown relative group">
                <Link to="/login" className="block px-6 py-4 hover:bg-purple-900">
                  LOGIN
                </Link>
                <ul className="dropdown-content">
                  <li><Link to="/signin" className="block px-4 py-2 hover:bg-purple-800">Sign In</Link></li>
                  <li><Link to="/signup" className="block px-4 py-2 hover:bg-purple-800">Sign Up</Link></li>
                </ul>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;