import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const DEFAULT_CONFIG = {
  focus: { label: 'Focus', subtext: 'FOCUS', time: 25 * 60, color: '#a78bfa' },
  short: { label: 'Short', subtext: 'SHORT', time: 5 * 60, color: '#00e5ff' },
  custom: { label: 'Custom', subtext: 'CUSTOM TIMER', time: 10 * 60, color: '#f59e0b' },
};

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  
  const [mode, setMode] = useState(() => localStorage.getItem('timer_mode') || 'focus');
  const [modeConfig, setModeConfig] = useState(DEFAULT_CONFIG);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(() =>
    parseInt(localStorage.getItem('timer_sessions') || '0', 10)
  );

  const [customHours, setCustomHours] = useState(0);
  const [customMins, setCustomMins] = useState(10);
  const [customSecs, setCustomSecs] = useState(0);

  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTimeLeft = localStorage.getItem('timer_time_left');
    if (savedTimeLeft) {
      return parseInt(savedTimeLeft, 10);
    }
    return DEFAULT_CONFIG[localStorage.getItem('timer_mode') || 'focus'].time;
  });

  const sendTimerData = async (completedMode, duration) => {
    try {
      const API_URL = "https://flow-desk-backend-ten.vercel.app";
      await axios.post(
        `${API_URL}/api/user/timer`,
        {
          mode: completedMode,
          durationInSeconds: duration,
          completedAt: new Date().toISOString(),
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.error('Failed to log timer session:', error);
    }
  };

  // Wrapped in useCallback so reference stays stable across renders
  const getStudyData = useCallback(async () => {
    const API_URL = "https://flow-desk-backend-ten.vercel.app";
    try {
      const response = await axios.get(`${API_URL}/api/user/timer`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching study data:', error);
      return []; // Return empty array on failure so UI does not crash
    }
  }, []);

  // 1. Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem('timer_mode', mode);
    localStorage.setItem('timer_running', isRunning.toString());
    localStorage.setItem('timer_sessions', sessionsCompleted.toString());
    localStorage.setItem('timer_time_left', timeLeft.toString());
  }, [mode, isRunning, sessionsCompleted, timeLeft]);

  // 2. Pause timer when tab/browser is closed or reloaded
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem('timer_running', 'false');
      localStorage.removeItem('timer_end_time');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  // 3. Countdown Interval
  useEffect(() => {
    if (!isRunning) return;

    let endTime = parseInt(localStorage.getItem('timer_end_time'), 10);
    if (!endTime || isNaN(endTime)) {
      endTime = Date.now() + timeLeft * 1000;
      localStorage.setItem('timer_end_time', endTime.toString());
    }

    const interval = setInterval(async () => {
      const remaining = Math.max(0, Math.round((endTime - Date.now()) / 1000));
      setTimeLeft(remaining);

      if (remaining === 0) {
        clearInterval(interval);
        setIsRunning(false);
        localStorage.removeItem('timer_end_time');
        localStorage.setItem('timer_running', 'false');

        // Increment sessions and send data to backend
        setSessionsCompleted((prev) => prev + 1);
        await sendTimerData(mode, modeConfig[mode].time);

        setTimeout(() => {
          setTimeLeft(modeConfig[mode].time);
        }, 1000);
      }
    }, 250);

    return () => clearInterval(interval);
  }, [isRunning, mode, modeConfig]);

  // Action Handlers
  const handleTogglePlay = () => {
    if (timeLeft === 0) {
      setTimeLeft(modeConfig[mode].time);
    }

    if (!isRunning) {
      const targetEndTime = Date.now() + (timeLeft === 0 ? modeConfig[mode].time : timeLeft) * 1000;
      localStorage.setItem('timer_end_time', targetEndTime.toString());
      setIsRunning(true);
    } else {
      localStorage.removeItem('timer_end_time');
      setIsRunning(false);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
    localStorage.setItem('timer_running', 'false');
    localStorage.removeItem('timer_end_time');
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    pauseTimer();
    setTimeLeft(modeConfig[newMode].time);
  };

  const handleReset = () => {
    pauseTimer();
    setTimeLeft(modeConfig[mode].time);
  };

  const handleStop = () => {
    pauseTimer();
  };

  const applyCustomTime = (hrs, mins, secs) => {
    const totalSeconds = Math.max(1, hrs * 3600 + mins * 60 + secs);
    setModeConfig((prev) => ({
      ...prev,
      custom: { ...prev.custom, time: totalSeconds },
    }));
    if (mode === 'custom') {
      pauseTimer();
      setTimeLeft(totalSeconds);
    }
  };

  return (
    <TimerContext.Provider
      value={{
        mode,
        modeConfig,
        timeLeft,
        isRunning,
        sessionsCompleted,
        customHours,
        customMins,
        customSecs,
        setCustomHours,
        setCustomMins,
        setCustomSecs,
        applyCustomTime,
        handleTogglePlay,
        handleModeChange,
        handleReset,
        handleStop,
        pauseTimer,
        getStudyData,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};