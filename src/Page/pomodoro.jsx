import React, { useState, useEffect, useRef } from 'react';
import { FiMaximize, FiMinimize, FiSettings } from 'react-icons/fi';

const soundOptions = [
  { label: "Snowfall", value: "/snowfall.mp3" },
  { label: "Birds Chirping", value: "/ArkPatrol-LetGo.mp3" },
  { label: "Rain", value: "/rain.mp3" },
  { label: "Forest", value: "/forest.mp3" },
];

const Pomodoro = () => {
  const defaultSettings = {
    workTime: 25,
    breakTime: 5,
    longBreakTime: 15,
    pomodorosUntilLongBreak: 4,
    selectedSound: soundOptions[0].value,
  };

  const [settings, setSettings] = useState(defaultSettings);
  const [minutes, setMinutes] = useState(defaultSettings.workTime);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const workAudioRef = useRef(null);
  const alertShownRef = useRef(false);
  const initialLoadRef = useRef(false);

  // Load settings and timer state on mount or page navigation
  useEffect(() => {
    if (initialLoadRef.current) return;

    const savedSettings = JSON.parse(localStorage.getItem('pomodoro-settings'));
    const savedState = JSON.parse(localStorage.getItem('pomodoro-state'));

    if (savedSettings) setSettings(savedSettings);

    if (savedState) {
      const { minutes, seconds, isWorkTime, pomodoroCount, isActive, lastUpdated } = savedState;
      const elapsed = Math.floor((Date.now() - lastUpdated) / 1000);
      let total = minutes * 60 + seconds - elapsed;

      if (total <= 0) {
        // Timer expired while away — reset to beginning of next session
        const isNextWorkTime = isWorkTime ? false : true;
        const newPomodoroCount = isWorkTime ? pomodoroCount + 1 : pomodoroCount;
        const nextMinutes = isNextWorkTime
          ? (savedSettings || defaultSettings).workTime
          : (newPomodoroCount % (savedSettings || defaultSettings).pomodorosUntilLongBreak === 0
            ? (savedSettings || defaultSettings).longBreakTime
            : (savedSettings || defaultSettings).breakTime);

        setMinutes(nextMinutes);
        setSeconds(0);
        setIsWorkTime(isNextWorkTime);
        setPomodoroCount(newPomodoroCount);
        setIsActive(false); // Don't auto-start
      } else {
        setMinutes(Math.floor(total / 60));
        setSeconds(total % 60);
        setIsWorkTime(isWorkTime);
        setPomodoroCount(pomodoroCount);
        setIsActive(isActive);
      }
    }

    initialLoadRef.current = true;
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('pomodoro-settings', JSON.stringify(settings));
  }, [settings]);

  // Save timer state
  useEffect(() => {
    if (isActive) {
      localStorage.setItem('pomodoro-state', JSON.stringify({
        minutes,
        seconds,
        isWorkTime,
        pomodoroCount,
        isActive,
        lastUpdated: Date.now()
      }));
    }
  }, [minutes, seconds, isActive, isWorkTime, pomodoroCount]);

  // Timer countdown
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            handleTimerCompletion(settings, pomodoroCount);
          } else {
            setMinutes(m => m - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(s => s - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, settings, pomodoroCount]);

  // Background audio loop
  useEffect(() => {
    if (!workAudioRef.current) {
      workAudioRef.current = new Audio(settings.selectedSound);
    } else {
      workAudioRef.current.pause();
      workAudioRef.current.src = settings.selectedSound;
    }

    const audio = workAudioRef.current;
    const loop = () => {
      audio.currentTime = 0;
      audio.play();
    };
    audio.addEventListener('ended', loop);

    return () => {
      audio.pause();
      audio.removeEventListener('ended', loop);
    };
  }, [settings.selectedSound]);

  const toggleTimer = () => {
    if (!isActive && isWorkTime) workAudioRef.current?.play();
    else workAudioRef.current?.pause();

    alertShownRef.current = false;
    setIsActive(!isActive);
  };

  const handleTimerCompletion = (currentSettings = settings, count = pomodoroCount) => {
    if (alertShownRef.current) return;
    alertShownRef.current = true;

    workAudioRef.current?.pause();

    if (isWorkTime) {
      const message = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
      alert(`Time for a break! ${message}`);
      const newCount = count + 1;
      setPomodoroCount(newCount);
      setMinutes(newCount % currentSettings.pomodorosUntilLongBreak === 0 ? currentSettings.longBreakTime : currentSettings.breakTime);
      setIsWorkTime(false);
    } else {
      setMinutes(currentSettings.workTime);
      setIsWorkTime(true);
    }

    setSeconds(0);
    setIsActive(false);
  };

  const resetTimer = () => {
    const { workTime, breakTime, longBreakTime, pomodorosUntilLongBreak } = settings;
    setIsActive(false);
    setMinutes(isWorkTime
      ? workTime
      : (pomodoroCount % pomodorosUntilLongBreak === 0 ? longBreakTime : breakTime)
    );
    setSeconds(0);
    alertShownRef.current = false;
  };

  const resetAll = () => {
    setSettings(defaultSettings);
    setPomodoroCount(0);
    setIsWorkTime(true);
    setIsActive(false);
    setMinutes(defaultSettings.workTime);
    setSeconds(0);
    alertShownRef.current = false;

    localStorage.removeItem('pomodoro-settings');
    localStorage.removeItem('pomodoro-state');
  };

  const handleSettingsSubmit = (e) => {
    e.preventDefault();
    setIsSettingsOpen(false);
    setIsWorkTime(true);
    setIsActive(false);
    setMinutes(settings.workTime);
    setSeconds(0);
    alertShownRef.current = false;
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  };

  useEffect(() => {
    const handler = () => {
      document.body.classList.toggle("pomodoro-fullscreen", !!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const motivationalMessages = [
    "Keep going, you're doing awesome! 💪",
    "Great job! Keep up the momentum! 🚀",
    "You're crushing it! Stay focused! 🔥",
    "Almost there! Keep pushing! 💥",
    "Keep your eyes on the prize! You got this! 🎯",
    "One step at a time, you're making progress! 🌟",
    "Believe in yourself and all that you are! 🌈",
    "Your hard work is paying off! Keep it up! 💼",
    "Stay strong, stay positive! 💖",
    "Every Pomodoro counts! You're amazing! ✨"
  ];

  const formatTime = (t) => (t < 10 ? `0${t}` : t);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 ${isWorkTime ? 'bg-gray-500' : 'bg-gray-700'} text-white`}>
      <div className={`max-w-md w-full bg-white/10 rounded-xl p-8 shadow-xl backdrop-blur-md ${isFullscreen ? 'scale-110' : ''}`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Pomodoro Timer</h1>
          <div className="flex gap-2">
            <button onClick={toggleFullscreen} className="p-2 bg-white/20 rounded hover:bg-white/30" title="Toggle Fullscreen">
              {isFullscreen ? <FiMinimize /> : <FiMaximize />}
            </button>
            <button onClick={() => setIsSettingsOpen(true)} className="p-2 bg-white/20 rounded hover:bg-white/30" title="Settings">
              <FiSettings />
            </button>
          </div>
        </div>

        <div className="text-8xl font-mono font-bold text-center my-8">
          {formatTime(minutes)}:{formatTime(seconds)}
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <button onClick={toggleTimer} className="px-6 py-3 bg-white text-gray-800 rounded-lg font-medium hover:bg-gray-100 shadow-md">
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button onClick={resetTimer} className="px-6 py-3 bg-white/20 rounded-lg font-medium hover:bg-white/30 shadow-md">
            Reset
          </button>
        </div>

        <div className="text-center space-y-2">
          <p className="text-xl">Current session: {isWorkTime ? 'Work' : 'Break'}</p>
          <p className="text-xl">Pomodoros completed: {pomodoroCount}</p>
        </div>
      </div>

      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full text-gray-800">
            <h2 className="text-2xl font-bold mb-4">Timer Settings</h2>
            <form onSubmit={handleSettingsSubmit} className="space-y-4">
              {[
                { label: "Work Duration", value: settings.workTime, setter: (v) => setSettings(s => ({ ...s, workTime: parseInt(v) })) },
                { label: "Short Break Duration", value: settings.breakTime, setter: (v) => setSettings(s => ({ ...s, breakTime: parseInt(v) })) },
                { label: "Long Break Duration", value: settings.longBreakTime, setter: (v) => setSettings(s => ({ ...s, longBreakTime: parseInt(v) })) },
                { label: "Pomodoros until long break", value: settings.pomodorosUntilLongBreak, setter: (v) => setSettings(s => ({ ...s, pomodorosUntilLongBreak: parseInt(v) })) },
              ].map((item, i) => (
                <div key={i}>
                  <label className="block text-sm font-medium mb-1">{item.label} (minutes):</label>
                  <input type="number" min="1" value={item.value} onChange={(e) => item.setter(e.target.value)} className="w-full p-2 border rounded-md" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium mb-1">Select Sound:</label>
                <select value={settings.selectedSound} onChange={(e) => setSettings(s => ({ ...s, selectedSound: e.target.value }))} className="w-full p-2 border rounded-md">
                  {soundOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between items-center pt-4 flex-wrap gap-2">
                <button type="button" onClick={resetAll} className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200">Reset All</button>
                <button type="button" onClick={() => setIsSettingsOpen(false)} className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Settings</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pomodoro;
