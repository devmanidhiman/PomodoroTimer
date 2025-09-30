// Popup script - communicates with background script
const timerDisplay = document.getElementById('timer-display');
const statusEl = document.getElementById('status');
const startButton = document.getElementById('start-btn');
const pauseButton = document.getElementById('pause-btn');
const resetButton = document.getElementById('reset-btn');
const settingsButton = document.getElementById('settings-btn');
const container = document.querySelector('.container');
const settingsPanel = document.getElementById('settings-panel');
const settingsForm = document.getElementById('settings-form');
const workDurationInput = document.getElementById('work-duration');
const shortBreakInput = document.getElementById('short-break-duration');
const longBreakInput = document.getElementById('long-break-duration');
const sessionsBeforeLongBreakInput = document.getElementById('sessions-before-long-break');
const autoStartWorkInput = document.getElementById('auto-start-work');
const autoStartBreaksInput = document.getElementById('auto-start-breaks');
const cancelSettingsBtn = document.getElementById('cancel-settings-btn');

// Message helper function
function sendMessage(action, data = {}) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ action, ...data }, resolve);
  });
}

// Track if we've already played sound for this session completion
let lastCompletedState = false;

// Update UI with current state
async function updateDisplay() {
  const state = await sendMessage('getState');
  
  // Check if a session just completed (for UI updates, but don't play sound)
  if (state.sessionCompleted && !lastCompletedState) {
    // Just clear the completed flag, don't play sound since background handles it
    chrome.runtime.sendMessage({ action: 'clearSessionCompleted' });
  }
  lastCompletedState = state.sessionCompleted || false;
  
  // Update timer display
  if (timerDisplay) {
    timerDisplay.textContent = formatTime(state.timeLeft);
  }
  
  // Update session label
  let sessionLabel = '';
  switch (state.currentSession) {
    case 'work':
      sessionLabel = 'Work Session';
      break;
    case 'shortBreak':
      sessionLabel = 'Short Break';
      break;
    case 'longBreak':
      sessionLabel = 'Long Break';
      break;
  }
  
  if (statusEl) {
    statusEl.textContent = sessionLabel;
  }
  
  // Update button states
  if (startButton) startButton.disabled = state.isRunning;
  if (pauseButton) pauseButton.disabled = !state.isRunning;
  if (resetButton) resetButton.disabled = state.isRunning && state.timeLeft > 0;
  
  // Update background colors
  if (container) {
    container.classList.remove('work-session', 'short-break-session', 'long-break-session');
    if (state.currentSession === 'work') {
      container.classList.add('work-session');
    } else if (state.currentSession === 'shortBreak') {
      container.classList.add('short-break-session');
    } else if (state.currentSession === 'longBreak') {
      container.classList.add('long-break-session');
    }
  }
}

// Format time helper
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${secs}`;
}

// Event listeners
if (startButton) {
  startButton.addEventListener('click', async () => {
    await sendMessage('start');
    if (statusEl) statusEl.textContent = 'Running';
  });
}

if (pauseButton) {
  pauseButton.addEventListener('click', async () => {
    await sendMessage('pause');
    if (statusEl) statusEl.textContent = 'Paused';
  });
}

if (resetButton) {
  resetButton.addEventListener('click', async () => {
    await sendMessage('reset');
    if (statusEl) statusEl.textContent = 'Stopped';
  });
}

if (settingsButton) {
  settingsButton.addEventListener('click', () => {
    if (settingsPanel) {
      settingsPanel.style.display = 'block';
    }
  });
}

if (settingsForm) {
  settingsForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newSettings = {
      workDuration: workDurationInput ? parseInt(workDurationInput.value, 10) : 25,
      shortBreakDuration: shortBreakInput ? parseInt(shortBreakInput.value, 10) : 5,
      longBreakDuration: longBreakInput ? parseInt(longBreakInput.value, 10) : 15,
      sessionsBeforeLongBreak: sessionsBeforeLongBreakInput ? parseInt(sessionsBeforeLongBreakInput.value, 10) : 4,
      autoStartBreaks: autoStartBreaksInput ? autoStartBreaksInput.checked : false,
      autoStartWork: autoStartWorkInput ? autoStartWorkInput.checked : false
    };
    await sendMessage('updateSettings', { settings: newSettings });
    if (settingsPanel) settingsPanel.style.display = 'none';
  });
}

if (cancelSettingsBtn) {
  cancelSettingsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (settingsPanel) settingsPanel.style.display = 'none';
  });
}

// Initialize and update display every second
document.addEventListener('DOMContentLoaded', () => {
  updateDisplay();
  setInterval(updateDisplay, 1000);
});