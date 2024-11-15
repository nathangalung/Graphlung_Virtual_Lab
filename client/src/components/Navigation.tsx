import React, { useState } from 'react';

const Navigation: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  return (
    <nav className="relative">
      <div className="hamburger md:hidden" onClick={toggleMenu}>
        ☰
      </div>
      <ul className={`nav-links ${isMenuOpen ? 'block' : 'hidden'} md:flex`}>
        <li className="dropdown relative group">
          <a href="#" className="block px-6 py-4 hover:bg-purple-900">HOME</a>
          <ul className="dropdown-content hidden group-hover:block absolute left-0 bg-[#2c003e] min-w-[200px] shadow-lg">
            <li><a href="#general" className="block px-4 py-2 hover:bg-purple-800">General</a></li>
            <li><a href="#math" className="block px-4 py-2 hover:bg-purple-800">Math</a></li>
            <li><a href="#graph" className="block px-4 py-2 hover:bg-purple-800">Graph</a></li>
          </ul>
        </li>
        <li className="dropdown relative group">
          <a href="#" className="block px-6 py-4 hover:bg-purple-900">SIMULATION</a>
          <ul className="dropdown-content hidden group-hover:block absolute left-0 bg-[#2c003e] min-w-[200px] shadow-lg">
            <li><a href="#cubic" className="block px-4 py-2 hover:bg-purple-800">Cubic</a></li>
            <li><a href="#sinus" className="block px-4 py-2 hover:bg-purple-800">Sinus</a></li>
            <li><a href="#cosinus" className="block px-4 py-2 hover:bg-purple-800">Cosinus</a></li>
            <li><a href="#tangen" className="block px-4 py-2 hover:bg-purple-800">Tangen</a></li>
          </ul>
        </li>
        <li className="dropdown relative group">
          <a href="#" className="block px-6 py-4 hover:bg-purple-900">LOGIN</a>
          <ul className="dropdown-content hidden group-hover:block absolute left-0 bg-[#2c003e] min-w-[200px] shadow-lg">
            <li><a href="#signin" className="block px-4 py-2 hover:bg-purple-800">Sign In</a></li>
            <li><a href="#signup" className="block px-4 py-2 hover:bg-purple-800">Sign Up</a></li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;