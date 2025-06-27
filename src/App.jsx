import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import SnakeLadder from "./components/SnakeLadder";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-purple-600 to-blue-700 rounded-xl p-8 w-[95%] max-w-md relative shadow-2xl modal-enter">
        <div className="absolute inset-0 opacity-10 overflow-hidden rounded-xl">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                fontSize: `${Math.random() * 20 + 20}px`
              }}
            >
              {Math.random() > 0.5 ? '🎲' : '🎮'}
            </div>
          ))}      
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-pink-200 text-xl font-bold transition-colors z-10"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${Math.random() * 20 + 20}px`
            }}
          >
            {Math.random() > 0.5 ? '🎲' : '🎮'}
          </div>
        ))}      
      </div>
      <h1 className="text-5xl md:text-6xl font-bold mb-12 text-center text-white font-game title-glow">
        Snake & Ladder
      </h1>
      
      <div className="space-y-4 w-full max-w-xs">
        <button
          onClick={() => navigate('/game')}
          className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all font-bold text-lg shadow-lg hover-scale"
        >
          PLAY
        </button>
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full py-3 px-6 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-lg hover:from-pink-600 hover:to-orange-600 transform hover:scale-105 transition-all font-bold text-lg shadow-lg hover-scale"
        >
          HOW TO PLAY
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-3xl font-bold mb-8 text-center text-white font-game title-glow relative z-10">How To Play</h2>
        <ul className="space-y-6 text-white text-lg relative z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg -z-10"></div>
          <li className="flex items-center p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
            <span className="mr-4 text-2xl">🎲</span>
            <span>Roll the dice in your turn</span>
          </li>
          <li className="flex items-center p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
            <span className="mr-4 text-2xl">🪜</span>
            <span>Climb ladders to move up faster</span>
          </li>
          <li className="flex items-center p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
            <span className="mr-4 text-2xl">🐍</span>
            <span>Avoid snakes or you'll fall down</span>
          </li>
          <li className="flex items-center p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
            <span className="mr-4 text-2xl">🏆</span>
            <span>First player to reach 100 wins!</span>
          </li>
        </ul>
      </Modal>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<SnakeLadder />} />
      </Routes>
    </Router>
  );
};

export default App;
