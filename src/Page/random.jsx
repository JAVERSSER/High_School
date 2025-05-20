import React, { useState, useEffect, useRef } from 'react';

const random = () => {
  const [names, setNames] = useState(['Alice', 'Bob', 'Charlie', 'David', 'Eve']);
  const [inputValue, setInputValue] = useState('');
  const [winner, setWinner] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinDuration, setSpinDuration] = useState(5); // in seconds
  const wheelRef = useRef(null);
  const wheelItemsRef = useRef([]);

  // Add names from input
  const addName = () => {
    if (inputValue.trim() && !names.includes(inputValue.trim())) {
      setNames([...names, inputValue.trim()]);
      setInputValue('');
    }
  };

  // Remove a name
  const removeName = (nameToRemove) => {
    setNames(names.filter(name => name !== nameToRemove));
  };

  // Spin the wheel
  const spinWheel = () => {
    if (names.length < 2 || isSpinning) return;
    
    setIsSpinning(true);
    setWinner(null);
    
    // Calculate random winner
    const winnerIndex = Math.floor(Math.random() * names.length);
    const winnerName = names[winnerIndex];
    
    // Spin animation
    const wheel = wheelRef.current;
    const items = wheelItemsRef.current;
    const itemAngle = 360 / names.length;
    const targetAngle = 360 * spinDuration * 2 + (winnerIndex * itemAngle);
    
    wheel.style.transition = `transform ${spinDuration}s cubic-bezier(0.17, 0.67, 0.12, 0.99)`;
    wheel.style.transform = `rotate(${-targetAngle}deg)`;
    
    // Highlight winner
    setTimeout(() => {
      setIsSpinning(false);
      setWinner(winnerName);
      items[winnerIndex].classList.add('winner');
    }, spinDuration * 1000);
  };

  // Reset wheel position after animation
  const handleTransitionEnd = () => {
    const wheel = wheelRef.current;
    wheel.style.transition = 'none';
    const currentRotation = parseInt(wheel.style.transform.replace(/[^0-9-]/g, '') || 0 );
    wheel.style.transform = `rotate(${currentRotation % 360}deg)`;
  };

  // Reset wheel highlighting
  useEffect(() => {
    if (!isSpinning && winner) {
      const timer = setTimeout(() => {
        wheelItemsRef.current.forEach(item => item.classList.remove('winner'));
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isSpinning, winner]);

  return (
    <div className="min-h-screen bg-gradient-to-br bg-gray-900 flex flex-col items-center justify-center p-4 text-white mt-16 md:mt-8">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-white/20 p-6 ">
          <h1 className="text-4xl font-bold text-center">Wheel of Names</h1>
          <p className="text-center opacity-80 mt-2">
            Spin the wheel to randomly select a name
          </p>
        </div>
        
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row mt-2 ">
          {/* Name Input Section */}
          <div className="m-2">
            <div className="flex mb-4">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addName()}
                placeholder="Add a name"
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button
                onClick={addName}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-r-lg transition-colors"
              >
                Add
              </button>
            </div>
            
            {/* Names List */}
            <div className="bg-white/5 rounded-lg p-4 h-64 overflow-y-auto">
              <h2 className="font-semibold mb-3">Names List ({names.length})</h2>
              {names.length === 0 ? (
                <p className="text-center opacity-70 py-8">No names added yet</p>
              ) : (
                <ul className="space-y-2">
                  {names.map((name, index) => (
                    <li key={index} className="flex justify-between items-center group">
                      <span>{name}</span>
                      <button
                        onClick={() => removeName(name)}
                        className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-opacity"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            {/* Spin Controls */}
            <div className="mt-6 flex items-center justify-between">
              <div>
                <label className="block text-sm mb-1">Spin Duration (sec):</label>
                <input
                  type="number"
                  min="2"
                  max="10"
                  value={spinDuration}
                  onChange={(e) => setSpinDuration(Math.max(2, Math.min(10, parseInt(e.target.value) || 5)))}
                  className="w-20 px-3 py-2 bg-white/10 border border-white/20 rounded-lg"
                />
              </div>
              <button
                onClick={spinWheel}
                disabled={names.length < 2 || isSpinning}
                className={`px-6 py-3 rounded-lg font-bold transition-all ${
                  names.length < 2 || isSpinning
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'bg-yellow-500 hover:bg-yellow-600 text-gray-900 hover:shadow-lg'
                }`}
              >
                {isSpinning ? 'Spinning...' : 'SPIN THE WHEEL'}
              </button>
            </div>
          </div>
          
          {/* Wheel Section */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 mb-8">
              {/* Wheel */}
              <div
                ref={wheelRef}
                className="absolute inset-0 rounded-full border-8 border-white/20 overflow-hidden"
                onTransitionEnd={handleTransitionEnd}
              >
                {names.map((name, index) => {
                  const angle = (360 / names.length) * index;
                  const style = {
                    transform: `rotate(${angle}deg)`,
                    transformOrigin: '0 50%',
                    position: 'absolute',
                    left: '50%',
                    top: 0,
                    width: '50%',
                    height: '50%',
                    background: `hsl(${(index * 360) / names.length}, 70%, 50%)`,
                    clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '20%',
                    boxSizing: 'border-box',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    color: 'white',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                    transition: 'all 0.3s ease'
                  };
                  
                  return (
                    <div
                      key={index}
                      ref={el => wheelItemsRef.current[index] = el}
                      style={style}
                    >
                      <span style={{ transform: `rotate(${90 + (360 / names.length / 2)}deg)` }}>
                        {name}
                      </span>
                    </div>
                  );
                })}
              </div>
              
              {/* Wheel Center */}
              <div className="absolute top-1/2 left-1/2 w-8 h-8 -mt-4 -ml-4 rounded-full bg-white z-10 shadow-md"></div>
              
              {/* Pointer */}
              <div className="absolute top-0 left-1/2 -ml-4 w-0 h-0 border-l-8 border-r-8 border-b-16 border-l-transparent border-r-transparent border-b-white"></div>
            </div>
            
            {/* Winner Display */}
            {winner && (
              <div className="text-center animate-bounce">
                <p className="text-lg">The winner is:</p>
                <p className="text-3xl font-bold text-yellow-400 mt-2">{winner}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default random;