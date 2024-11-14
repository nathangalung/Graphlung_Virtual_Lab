import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#2c003e] text-white fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="container mx-auto px-8 h-[70px] flex justify-between items-center">
        {/* Adjusted positioning of the logo */}
        <h1 className="text-2xl font-black-ops ml-8">Graphlung Virtual Lab</h1>
        <nav>
          {/* Mobile Hamburger Menu */}
          <div 
            className="md:hidden text-2xl cursor-pointer mr-6"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </div>
          <ul className={`nav-links ${isMenuOpen ? 'block' : 'hidden'} md:flex`}>
            {/* Home Navbar Item */}
            <li className="dropdown relative group">
              <Link to="/" className="block px-6 py-4 hover:bg-purple-900">
                HOME
              </Link>
              <ul className="dropdown-content hidden group-hover:block absolute left-0 bg-[#2c003e] w-full shadow-lg">
                <li>
                  <Link to="/#general" className="block px-4 py-2 hover:bg-purple-800">
                    General
                  </Link>
                </li>
                <li>
                  <Link to="/#math" className="block px-4 py-2 hover:bg-purple-800">
                    Math
                  </Link>
                </li>
                <li>
                  <Link to="/#graph" className="block px-4 py-2 hover:bg-purple-800">
                    Graph
                  </Link>
                </li>
              </ul>
            </li>

            {/* Simulation Navbar Item */}
            <li className="dropdown relative group">
              <Link to="/simulation" className="block px-6 py-4 hover:bg-purple-900">
                SIMULATION
              </Link>
              <ul className="dropdown-content hidden group-hover:block absolute left-0 bg-[#2c003e] w-full shadow-lg">
                <li>
                  <Link to="/simulation#cubic" className="block px-4 py-2 hover:bg-purple-800">
                    Cubic
                  </Link>
                </li>
                <li>
                  <Link to="/simulation#sinus" className="block px-4 py-2 hover:bg-purple-800">
                    Sinus
                  </Link>
                </li>
                <li>
                  <Link to="/simulation#cosinus" className="block px-4 py-2 hover:bg-purple-800">
                    Cosinus
                  </Link>
                </li>
                <li>
                  <Link to="/simulation#tangen" className="block px-4 py-2 hover:bg-purple-800">
                    Tangen
                  </Link>
                </li>
              </ul>
            </li>

            {/* Game Navbar Item */}
            <li className="dropdown relative group">
              <Link to="/game" className="block px-6 py-4 hover:bg-purple-900">
                GAME
              </Link>
            </li>

            {/* Login Navbar Item */}
            <li className="dropdown relative group">
              <Link to="/login" className="block px-6 py-4 hover:bg-purple-900">
                LOGINzz
              </Link>
              <ul className="dropdown-content hidden group-hover:block absolute left-0 bg-[#2c003e] w-full shadow-lg">
                <li>
                  <Link to="/login#signin" className="block px-4 py-2 hover:bg-purple-800">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link to="/login#signup" className="block px-4 py-2 hover:bg-purple-800">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
