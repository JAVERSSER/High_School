import React, { useState, useEffect } from 'react';

const game = () => {
  const [activeGame, setActiveGame] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const games = [
    {
      id: 'tic-tac-toe',
      name: "Tic Tac Toe",
      description: "The classic X and O game",
      component: <TicTacToe darkMode={darkMode} />
    },
    {
      id: 'memory-match',
      name: "Memory Match",
      description: "Find all matching pairs",
      component: <MemoryGame darkMode={darkMode} />
    },
    {
      id: 'snake',
      name: "Snake Game",
      description: "The classic snake game",
      component: <SnakeGame darkMode={darkMode} />
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto p-6 mt-14">
        {!activeGame ? (
          <>
            <div className="flex justify-between items-center m-10">
              <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Game Zone
              </h1>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
              >
                {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map((game) => (
                <div
                  key={game.id}
                  onClick={() => setActiveGame(game.id)}
                  className={`rounded-xl shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 ${darkMode ? 'bg-gray-800' : 'bg-white'
                    }`}
                >
                  <div className="p-6">
                    <h2 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'
                      }`}>
                      {game.name}
                    </h2>
                    <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {game.description}
                    </p>
                    <button
                      className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-blue-500 hover:bg-blue-600'
                        } text-white`}
                    >
                      Play Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="mt-6">
            <button
              onClick={() => setActiveGame(null)}
              className={`mb-6 flex items-center px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                }`}
            >
              ← Back to Games
            </button>
            {games.find(game => game.id === activeGame)?.component}
          </div>
        )}
      </div>
    </div>
  );
};

// Tic-Tac-Toe Game Component
const Square = ({ value, onClick, darkMode }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center text-3xl font-bold h-20 w-20 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
        } rounded-lg`}
    >
      {value}
    </button>
  );
};

const TicTacToe = ({ darkMode }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;

    const updatedBoard = board.slice();
    updatedBoard[index] = isXNext ? 'X' : 'O';
    setBoard(updatedBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : board.every(cell => cell)
      ? 'Draw!'
      : `Next Player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        Tic Tac Toe
      </h2>
      <div className={`text-lg mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {status}
      </div>
      <div className="grid grid-cols-3 gap-2 mx-auto w-fit">
        {board.map((value, i) => (
          <Square
            key={i}
            value={value}
            onClick={() => handleClick(i)}
            darkMode={darkMode}
          />
        ))}
      </div>
      <button
        onClick={resetGame}
        className={`mt-6 px-4 py-2 rounded-lg ${darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
      >
        Reset Game
      </button>
    </div>
  );
};

// Memory Game Component
const MemoryGame = ({ darkMode }) => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const emojisPairs = [...emojis, ...emojis];
    const shuffled = emojisPairs
      .sort(() => Math.random() - 0.5)
      .map((emoji, i) => ({ id: i, emoji, flipped: false }));

    setCards(shuffled);
    setFlipped([]);
    setSolved([]);
  };

  const handleClick = (id) => {
    if (disabled || flipped.length === 2 || solved.includes(id) || flipped.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setDisabled(true);
      const [first, second] = newFlipped;

      if (cards[first].emoji === cards[second].emoji) {
        setSolved([...solved, first, second]);
        setFlipped([]);
        setDisabled(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1000);
      }
    }
  };

  return (
    <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        Memory Match
      </h2>
      <div className="grid grid-cols-4 gap-2 w-64 mx-auto">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleClick(card.id)}
            className={`flex items-center justify-center h-16 text-2xl rounded-lg ${flipped.includes(card.id) || solved.includes(card.id)
              ? 'bg-blue-500 text-white'
              : darkMode
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-200 hover:bg-gray-300'
              }`}
            disabled={flipped.includes(card.id) || solved.includes(card.id)}
          >
            {flipped.includes(card.id) || solved.includes(card.id) ? card.emoji : '?'}
          </button>
        ))}
      </div>
      <button
        onClick={initializeGame}
        className={`mt-6 px-4 py-2 rounded-lg ${darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
      >
        New Game
      </button>
    </div>
  );
};

// Snake Game Component
const SnakeGame = ({ darkMode }) => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const gridSize = 20;
  const cellSize = 15;

  // Detect mobile device
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Game loop
  useEffect(() => {
    if (!gameOver && !isPaused) {
      const gameInterval = setInterval(moveSnake, 100);
      return () => clearInterval(gameInterval);
    }
  }, [snake, gameOver, isPaused]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOver) return;

      const keysToPrevent = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
      if (keysToPrevent.includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        case ' ':
          setIsPaused(!isPaused);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameOver, isPaused]);

  const moveSnake = () => {
    if (gameOver || isPaused) return;

    const head = { ...snake[0] };

    switch (direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
      default:
        break;
    }

    // Wall collision
    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
      setGameOver(true);
      return;
    }

    // Self collision
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
      setGameOver(true);
      return;
    }

    const newSnake = [head, ...snake];

    // Food collision
    if (head.x === food.x && head.y === food.y) {
      setScore(score + 10);
      setFood({
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize)
      });
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  const resetGame = () => {
    // Your existing reset logic here
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 5, y: 5 });
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setIsPaused(false);

    // Scroll to top smoothly
    if (window.innerWidth <= 768) { // common breakpoint for tablets and phones
      window.scrollTo({ top: 200, behavior: 'smooth' });
    }
  };

  const handleDirectionChange = (newDirection) => {
    if (gameOver || isPaused) return;

    // Prevent reverse direction
    if (
      (direction === 'UP' && newDirection === 'DOWN') ||
      (direction === 'DOWN' && newDirection === 'UP') ||
      (direction === 'LEFT' && newDirection === 'RIGHT') ||
      (direction === 'RIGHT' && newDirection === 'LEFT')
    ) {
      return;
    }

    setDirection(newDirection);
  };

  return (
    <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg max-w-md mx-auto`}>
      {/* Game Header */}
      <div className="text-center mb-6">
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Snake Game
        </h2>
        <div className={`text-lg mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Score: {score}
        </div>
        {gameOver && <div className="text-red-500 font-bold mt-2">Game Over!</div>}
        {isPaused && !gameOver && <div className="text-yellow-500 font-bold mt-2">Paused</div>}
      </div>

      {/* Game Board */}
      <div className="flex justify-center mb-6">
        <div
          className={`relative border-2 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}
          style={{
            width: gridSize * cellSize,
            height: gridSize * cellSize,
            minWidth: gridSize * cellSize
          }}
        >
          {/* Food */}
          <div
            className="absolute bg-red-500 rounded-full"
            style={{
              width: cellSize - 2,
              height: cellSize - 2,
              left: food.x * cellSize,
              top: food.y * cellSize
            }}
          />

          {/* Snake */}
          {snake.map((segment, i) => (
            <div
              key={i}
              className={`absolute ${i === 0 ? 'bg-green-700' : 'bg-green-500'} rounded-sm`}
              style={{
                width: cellSize - 2,
                height: cellSize - 2,
                left: segment.x * cellSize,
                top: segment.y * cellSize
              }}
            />
          ))}
        </div>
      </div>

      {/* Mobile Controls */}
      {isMobile && (
        <div className="mb-6">
          <div className="flex justify-center mb-3">
            <button
              onClick={() => handleDirectionChange('UP')}
              className={`w-16 h-16 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-700 active:bg-gray-600' : 'bg-gray-200 active:bg-gray-300'
                } transition-colors`}
              disabled={gameOver || isPaused}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>
          <div className="flex justify-center gap-16">
            <button
              onClick={() => handleDirectionChange('LEFT')}
              className={`w-16 h-16 mr-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-700 active:bg-gray-600' : 'bg-gray-200 active:bg-gray-300'
                } transition-colors`}
              disabled={gameOver || isPaused}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => handleDirectionChange('RIGHT')}
              className={`w-16 h-16 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-700 active:bg-gray-600' : 'bg-gray-200 active:bg-gray-300'
                } transition-colors`}
              disabled={gameOver || isPaused}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="flex justify-center mt-3">
            <button
              onClick={() => handleDirectionChange('DOWN')}
              className={`w-16 h-16 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-700 active:bg-gray-600' : 'bg-gray-200 active:bg-gray-300'
                } transition-colors`}
              disabled={gameOver || isPaused}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Game Controls */}
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => setIsPaused(!isPaused)}
          disabled={gameOver}
          className={`px-5 py-2 rounded-lg ${darkMode ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-yellow-500 hover:bg-yellow-600'
            } text-white transition-colors`}
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        <button
          onClick={resetGame}
          className={`px-5 py-2 rounded-lg ${darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-blue-500 hover:bg-blue-600'
            } text-white transition-colors`}
        >
          New Game
        </button>
      </div>

      {/* Instructions */}
      <div className={`text-sm text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        <p>
          {isMobile ? 'Use buttons above' : 'Arrow keys'} to move •
          Space to {isPaused ? 'resume' : 'pause'}
        </p>
      </div>
    </div>
  );
};

export default game;