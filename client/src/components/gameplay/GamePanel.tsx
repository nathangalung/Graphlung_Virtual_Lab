// src/components/gameplay/GamePanel.tsx

import React, { useState } from 'react';

interface GamePanelProps {
  exitToMenu: () => void;
}

const GamePanel: React.FC<GamePanelProps> = ({ exitToMenu }) => {
  const [isPaused, setIsPaused] = useState(false);

  const togglePause = () => setIsPaused(!isPaused);

  return (
    <div className="fixed top-0 right-0 p-4 z-50">
      {/* Menu Icon to open Pause Menu */}
      <button onClick={togglePause} className="text-2xl">
        ☰
      </button>

      {/* Centered Pause Menu Modal */}
      {isPaused && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg text-center shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Paused</h2>
            <button
              onClick={togglePause}
              className="button mb-4 w-full text-lg"
            >
              Resume
            </button>
            <button
              onClick={exitToMenu}
              className="button w-full text-lg"
            >
              Main Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePanel;
