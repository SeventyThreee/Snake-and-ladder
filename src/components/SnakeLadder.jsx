import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const snakes = {
  25: 3,
  42: 1,
  56: 48,
  61: 43,
  92: 67,
  94: 12,
  98: 80,
};
const ladders = {
  7: 30,
  16: 33,
  20: 38,
  36: 83,
  50: 68,
  63: 81,
  71: 89,
  86: 97,
};

const generateBoardNumbers = () => {
  let board = [];
  for (let row = 9; row >= 0; row--) {
    let numbers = [];
    for (let col = 0; col < 10; col++) {
      numbers.push(row % 2 === 0 ? row * 10 + col + 1 : (row + 1) * 10 - col);
    }
    board.push(...numbers);
  }
  return board;
};

const boardNumbers = generateBoardNumbers();

const SnakeLadder = () => {
  const navigate = useNavigate();
  const [playerPos, setPlayerPos] = useState(0);
  const [botPos, setBotPos] = useState(0);
  const [dice, setDice] = useState(1);
  const [turn, setTurn] = useState("You");
  const [rolling, setRolling] = useState(false);
  const [hasPlayerRoll, setHasPlayerRoll] = useState(false);

  const rollDiceSound = new Audio("roll.mp3");

  const movePlayer = (currentPos, roll, setPos, player) => {
    console.log(currentPos, roll);
    if (currentPos + roll > 100) return;
    let newPos = currentPos;
    const interval = setInterval(() => {
      if (newPos < currentPos + roll) {
        newPos++;
        setPos(newPos);
      } else {
        clearInterval(interval);
        if (snakes[newPos]) newPos = snakes[newPos];
        if (ladders[newPos]) newPos = ladders[newPos];
        setPos(newPos);

        if (newPos === 100) {
          alert(player + " Wins");
          window.location.reload();
        }
      }
    }, 300);
  };

  const rollDice = () => {
    if (hasPlayerRoll) return;
    if (turn !== "You" || rolling) return;
    rollDiceSound.play();

    setHasPlayerRoll(turn);
    setRolling(true);
    setDice(null);
    setTimeout(() => {
      const roll = Math.floor(Math.random() * 6) + 1;
      setDice(roll);
      setRolling(false);
      movePlayer(playerPos, roll, setPlayerPos, "You");
      setTimeout(() => {
        setTurn("bot");
        setTimeout(botMove, roll * 300 + 100);
      }, roll * 300 + 500);
    }, 1000);
  };

  const botMove = () => {
    setRolling(true);
    setDice(null);
    rollDiceSound.play();
    setTimeout(() => {
      const roll = Math.floor(Math.random() * 6) + 1;
      setDice(roll);
      movePlayer(botPos, roll, setBotPos, "Bot");
      setRolling(false);
      setTimeout(() => {
        setTurn("You");
        setHasPlayerRoll(false);
      }, roll * 300 + 500);
    }, 1000);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center p-4 relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 gap-8">
      <div className="absolute inset-0 opacity-10 overflow-hidden">
        {[...Array(15)].map((_, i) => (
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
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all font-bold text-sm shadow-lg hover-scale"
      >
        ← Back
      </button>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center text-white title-glow font-game">
          Play. Learn. Prevent: A Digital Health Literacy Game for Hypertension Management
        </h1>
        <div
          className="relative w-[90vw] h-[90vw] sm:w-[70vw] sm:h-[70vw] lg:w-[600px] lg:h-[600px] bg-cover bg-center grid grid-cols-10 border-4 border-purple-300 rounded-lg shadow-2xl overflow-hidden"
          style={{ backgroundImage: "url('board.png')" }}
        >
          {boardNumbers.map((num) => (
            <div
              key={num}
              className="relative w-[9vw] h-[9vw] md:w-[60px] md:h-[60px] flex items-center justify-center"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                {playerPos === num && (
                  <img
                    src="blue.png"
                    alt="Player"
                    className="w-8 h-10 md:w-12 md:h-12 transition-transform duration-300 z-10"
                  />
                )}
                {botPos === num && (
                  <img
                    src="red.png"
                    alt="Bot"
                    className="w-8 h-10 md:w-12 md:h-12 transition-transform duration-300 z-10"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex">
          {playerPos == 0 && (
            <img
              src="blue.png"
              alt="Player"
              className="w-8 h-10 md:w-12 md:h-12"
            />
          )}
          {botPos === 0 && (
            <img src="red.png" alt="Bot" className="w-8 h-10 md:w-12 md:h-12" />
          )}
        </div>
      </div>
      <div className="mt-6 lg:mt-0 lg:ml-8 flex flex-col items-center bg-gradient-to-br from-purple-900/50 to-blue-900/50 p-6 rounded-xl backdrop-blur-sm">
        <div className="mt-4 relative">
          {rolling ? (
            <img src="roll.gif" alt="Rolling..." className="w-20 h-20 sm:w-24 sm:h-24 dice-shake" />
          ) : (
            <img
              src={`${dice}.png`}
              alt={`Dice ${dice}`}
              className="w-20 h-20 sm:w-24 sm:h-24 hover-scale cursor-pointer"
              onClick={rollDice}
              style={{
                cursor: rolling ? "not-allowed" : "pointer",
                pointerEvents: rolling ? "none" : "auto",
              }}
            />
          )}
        </div>
        <div className="mt-2 font-bold flex w-40 justify-center items-center gap-2 text-white">
          {turn === "You" ? (
            <img src="blue.png" alt="Bot" className="w-8 h-10 md:w-12 md:h-12" />
          ) : (
            <img src="red.png" alt="Bot" className="w-8 h-10 md:w-12 md:h-12" />
          )}
          <span>{turn.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};

export default SnakeLadder;
