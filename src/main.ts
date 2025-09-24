import { PomodoroTimer } from "./models/PomodoroTimer"; 

const timerDisplay = document.getElementById('timer-display');
const statusEl = document.getElementById('status');
const startButton = document.getElementById('start-btn');
const pauseButton = document.getElementById('pause-btn');
const resetButton = document.getElementById('reset-btn');
const settingsButton = document.getElementById('settings-btn');


document.addEventListener('DOMContentLoaded', () => {
  if (timerDisplay) {
    console.log('✅ DOM elements found successfully');
  }
});

const pomodoro = new PomodoroTimer();

function updateDisplay() {
  if (timerDisplay) {
    timerDisplay.textContent = pomodoro.getTimeRemaining();
  }
}
setInterval(updateDisplay, 1000);

if (startButton) {
  startButton.addEventListener('click', () => {
    pomodoro.start();
    if (statusEl) statusEl.textContent = 'Running';
  });
}

if (pauseButton) {
  pauseButton.addEventListener('click', () => {
    pomodoro.pause();
    if (statusEl) statusEl.textContent = 'Paused';
  });
}

if (resetButton) {
  resetButton.addEventListener('click', () => {
    pomodoro.reset();
    if (statusEl) statusEl.textContent = 'Stopped';
  });
}

if (settingsButton) {
  settingsButton.addEventListener('click', () => {
    // Open settings modal or panel
  });
}