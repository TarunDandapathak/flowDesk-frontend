import React, { useEffect, useState } from 'react';
import { RotateCcw, Play, Pause, X, Calendar, Clock } from 'lucide-react';
import { useTimer } from './TimerContext.jsx';
import './Timer.css';

export default function Timer() {
  const {
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
    getStudyData,
  } = useTimer();

  const [studyHistory, setStudyHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Fetch study data on mount and whenever sessions change
  // Locate this inside useEffect in Timer.jsx:
  useEffect(() => {
    let isMounted = true;

    const fetchHistory = async () => {
      setLoadingHistory(true);
      try {
        const response = await getStudyData();
        // console.log("Raw API Response:", response);

        if (!isMounted) return;

        // 1. Handle response where studyData is a single Object
        if (response?.studyData && !Array.isArray(response.studyData)) {
          setStudyHistory([response.studyData]);
        }
        // 2. Handle response where studyData is an Array of records
        else if (Array.isArray(response?.studyData)) {
          setStudyHistory(response.studyData);
        }
        // 3. Direct array response
        else if (Array.isArray(response)) {
          setStudyHistory(response);
        } else {
          setStudyHistory([]);
        }
      } catch (err) {
        console.error("Error setting study history:", err);
        if (isMounted) setStudyHistory([]);
      } finally {
        if (isMounted) setLoadingHistory(false);
      }
    };

    fetchHistory();

    return () => {
      isMounted = false;
    };
  }, [sessionsCompleted, getStudyData]);

  const handleHourChange = (e) => {
    const hrs = Math.max(0, parseInt(e.target.value, 10) || 0);
    setCustomHours(hrs);
    applyCustomTime(hrs, customMins, customSecs);
  };

  const handleMinChange = (e) => {
    const mins = Math.min(59, Math.max(0, parseInt(e.target.value, 10) || 0));
    setCustomMins(mins);
    applyCustomTime(customHours, mins, customSecs);
  };

  const handleSecChange = (e) => {
    const secs = Math.min(59, Math.max(0, parseInt(e.target.value, 10) || 0));
    setCustomSecs(secs);
    applyCustomTime(customHours, customMins, secs);
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const formattedMins = mins.toString().padStart(2, '0');
    const formattedSecs = secs.toString().padStart(2, '0');

    if (hrs > 0 || modeConfig[mode].time >= 3600) {
      const formattedHrs = hrs.toString().padStart(2, '0');
      return `${formattedHrs}:${formattedMins}:${formattedSecs}`;
    }
    return `${formattedMins}:${formattedSecs}`;
  };

  const formatDuration = (totalSecs) => {
    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;

    if (h > 0) return `${h}h ${m}m`;
    if (m > 0) return `${m}m ${s > 0 ? `${s}s` : ''}`;
    return `${s}s`;
  };

  const formatDate = (isoString) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const radius = 118;
  const circumference = 2 * Math.PI * radius;
  const totalTime = modeConfig[mode].time;

  const progress = (totalTime - timeLeft) / totalTime;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="timer-wrapper">
      <div className="timer-card">
        {/* Mode Selector */}
        <div className="mode-selector">
          {Object.keys(modeConfig).map((m) => (
            <button
              key={m}
              onClick={() => handleModeChange(m)}
              className={`mode-btn ${mode === m ? 'active' : ''}`}
            >
              {modeConfig[m].label}
            </button>
          ))}
        </div>

        {/* Custom Input */}
        {mode === 'custom' && (
          <div className="custom-input-container">
            <span className="custom-label">Set Time</span>
            <div className="custom-time-inputs">
              <input
                type="number"
                min="0"
                max="99"
                value={customHours}
                onChange={handleHourChange}
                disabled={isRunning}
                className="custom-input"
                placeholder="HH"
              />
              <span className="custom-colon">:</span>
              <input
                type="number"
                min="0"
                max="59"
                value={customMins}
                onChange={handleMinChange}
                disabled={isRunning}
                className="custom-input"
                placeholder="MM"
              />
              <span className="custom-colon">:</span>
              <input
                type="number"
                min="0"
                max="59"
                value={customSecs}
                onChange={handleSecChange}
                disabled={isRunning}
                className="custom-input"
                placeholder="SS"
              />
            </div>
          </div>
        )}

        {/* Circular Display */}
        <div className="timer-circle">
          <svg className="progress-ring" width="256" height="256">
            <circle
              className="progress-ring-bg"
              strokeWidth="5"
              fill="transparent"
              r={radius}
              cx="128"
              cy="128"
            />
            <circle
              className="progress-ring-bar"
              stroke={modeConfig[mode].color}
              strokeWidth="5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              r={radius}
              cx="128"
              cy="128"
            />
          </svg>

          <div className="timer-display">
            <span
              className={`time-text ${formatTime(timeLeft).length > 5 ? 'long-time' : ''}`}
              style={{ color: modeConfig[mode].color }}
            >
              {formatTime(timeLeft)}
            </span>
            <span className="mode-text">{modeConfig[mode].subtext}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="controls-row">
          <button
            onClick={handleReset}
            className="icon-btn"
            title="Reset timer"
          >
            <RotateCcw size={20} />
          </button>

          <button onClick={handleTogglePlay} className="play-btn">
            {isRunning ? (
              <Pause size={22} fill="currentColor" />
            ) : (
              <Play size={22} fill="currentColor" className="play-icon" />
            )}
          </button>

          <button
            onClick={handleStop}
            className="icon-btn"
            title="Stop timer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="divider" />

        {/* Sessions Tracker */}
        <div className="sessions-tracker">
          <span className="sessions-label">Sessions</span>

          <div className="dots-container">
            {[1, 2, 3, 4].map((step) => {
              const activeDots =
                sessionsCompleted % 4 === 0 && sessionsCompleted > 0
                  ? 4
                  : sessionsCompleted % 4;
              return (
                <div
                  key={step}
                  className={`dot ${step <= activeDots ? 'active' : ''}`}
                />
              );
            })}
          </div>

          <span className="session-count">{sessionsCompleted}</span>
        </div>

        <div className="divider" />

        {/* User Study Data / History Log */}
        <div className="study-history-list">
          {studyHistory.map((item, index) => (
            <div key={item._id || item.id || index} className="study-history-item">
              <div className="study-item-mode">
                <span
                  className="mode-badge"
                  style={{
                    backgroundColor:
                      modeConfig[item.mode]?.color || '#a78bfa',
                  }}
                >
                  {item.mode ? item.mode.toUpperCase() : 'FOCUS'}
                </span>
                <span className="study-duration">
                  <Clock size={14} />
                  {/* Fallback support for studyTime or durationInSeconds */}
                  {formatDuration(item.studyTime || item.durationInSeconds || 0)}
                </span>
              </div>

              <div className="study-item-date">
                <Calendar size={14} />
                {/* Fallback support for date or completedAt */}
                <span>{formatDate(item.date)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}