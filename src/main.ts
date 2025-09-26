import { PomodoroTimer } from "./models/PomodoroTimer"; 
import { SessionType, Settings} from "./types";

const timerDisplay = document.getElementById('timer-display');
const statusEl = document.getElementById('status');
const startButton = document.getElementById('start-btn') as HTMLButtonElement | null;
const pauseButton = document.getElementById('pause-btn') as HTMLButtonElement | null;
const resetButton = document.getElementById('reset-btn') as HTMLButtonElement | null;
const settingsButton = document.getElementById('settings-btn') as HTMLButtonElement | null;
const container = document.querySelector('.container') as HTMLElement | null;
const settingsPanel = document.getElementById('settings-panel');
const settingsForm = document.getElementById('settings-form') as HTMLFormElement | null;
const workDurationInput = document.getElementById('work-duration') as HTMLInputElement | null;
const shortBreakInput = document.getElementById('short-break-duration') as HTMLInputElement | null;
const longBreakInput = document.getElementById('long-break-duration') as HTMLInputElement | null;
const sessionsBeforeLongBreakInput = document.getElementById('sessions-before-long-break') as HTMLInputElement | null;
const autoStartWorkInput = document.getElementById('auto-start-work') as HTMLInputElement | null;
const autoStartBreaksInput = document.getElementById('auto-start-breaks') as HTMLInputElement | null;
const cancelSettingsBtn = document.getElementById('cancel-settings-btn') as HTMLButtonElement | null;
const notificationSound = document.getElementById('notification-sound') as HTMLAudioElement;

const defaultSettings = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  autoStartBreaks: false,
  autoStartWork: false,
  sessionsBeforeLongBreak: 4
};

document.addEventListener('DOMContentLoaded', () => {
  if (timerDisplay) {
    console.log('✅ DOM elements found successfully');
  }
});

const pomodoro = new PomodoroTimer(defaultSettings);
pomodoro.onSessionEnd(() => {
  if (notificationSound) {
    notificationSound.currentTime = 0;
    notificationSound.play();
    notificationSound.play();
  }
});
let lastTimeLeft = pomodoro.getState().timeLeft;


function updateDisplay() {
  if (timerDisplay) {
    timerDisplay.textContent = pomodoro.getTimeRemaining();
  }
  const {currentSession, isRunning, timeLeft} = pomodoro.getState();
  let sessionLabel = "";
  switch(currentSession) {
    case SessionType.Work:
      sessionLabel = "Work Session";
      break;
    case SessionType.ShortBreak:
      sessionLabel = "Short Break";
      break;
    case SessionType.LongBreak:
      sessionLabel = "Long Break";
      break;
  }
  if (startButton) startButton.disabled = isRunning;
  if (pauseButton) pauseButton.disabled = !isRunning;
  if (resetButton) resetButton.disabled = isRunning && timeLeft > 0;
  if (statusEl) {
    statusEl.textContent = sessionLabel;
  }

  if (container){
    container.classList.remove('work-session', 'short-break-session', 'long-break-session');
    if (currentSession === SessionType.Work) {
      container.classList.add('work-session');
    } else if (currentSession === SessionType.ShortBreak) {
      container.classList.add('short-break-session');
    } else if (currentSession === SessionType.LongBreak) {
      container.classList.add('long-break-session');
    }
  }
  
  if (!isRunning && timeLeft === 0) {
    if (lastTimeLeft > 0 && timeLeft === 0 && notificationSound) {
      notificationSound.currentTime = 0;
      notificationSound.play();
    }
    lastTimeLeft = timeLeft;
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
    if (settingsPanel) {
      settingsPanel.style.display = 'block';
    }
  });
}

if (settingsForm){
  settingsForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const newSettings: Settings = {
      workDuration: workDurationInput ? parseInt(workDurationInput.value, 10) : 25,
      shortBreakDuration: shortBreakInput ? parseInt(shortBreakInput.value, 10) : 5,
      longBreakDuration: longBreakInput ? parseInt(longBreakInput.value, 10) : 15,
      sessionsBeforeLongBreak: sessionsBeforeLongBreakInput ? parseInt(sessionsBeforeLongBreakInput.value, 10) : 4, 
      autoStartBreaks: autoStartBreaksInput ? autoStartBreaksInput.checked : false,
      autoStartWork : autoStartWorkInput ? autoStartWorkInput.checked : false
    };
    pomodoro.updateSettings(newSettings);
    if (settingsPanel) settingsPanel.style.display = 'none';
  });
}

if (cancelSettingsBtn && settingsButton) {
  cancelSettingsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (settingsPanel) settingsPanel.style.display = 'none';
  });
}

