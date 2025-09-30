// Background script - handles timer logic that persists when popup closes
console.log('Background script loaded');

let timerState = {
  isRunning: false,
  timeLeft: 25 * 60, // 25 minutes in seconds
  currentSession: 'work',
  completedSessions: 0,
  settings: {
    workDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    sessionsBeforeLongBreak: 4
  }
};

let timerId = null;

// Handle messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.action) {
    case 'getState':
      sendResponse(timerState);
      break;
    case 'start':
      startTimer();
      sendResponse({ success: true });
      break;
    case 'pause':
      pauseTimer();
      sendResponse({ success: true });
      break;
    case 'reset':
      resetTimer();
      sendResponse({ success: true });
      break;
    case 'updateSettings':
      updateSettings(message.settings);
      sendResponse({ success: true });
      break;
    case 'clearSessionCompleted':
      timerState.sessionCompleted = false;
      sendResponse({ success: true });
      break;
  }
});

function startTimer() {
  if (timerState.isRunning) return;
  
  console.log('Starting timer in background');
  timerState.isRunning = true;
  
  if (timerId) clearInterval(timerId);
  
  timerId = setInterval(() => {
    console.log('Timer tick, time left:', timerState.timeLeft);
    if (timerState.timeLeft > 0) {
      timerState.timeLeft--;
    } else {
      // Session completed
      console.log('Timer reached zero, completing session');
      sessionComplete();
    }
  }, 1000);
}

function pauseTimer() {
  timerState.isRunning = false;
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
}

function resetTimer() {
  pauseTimer();
  timerState.timeLeft = timerState.settings.workDuration * 60;
  timerState.completedSessions = 0;
  timerState.currentSession = 'work';
}

function sessionComplete() {
  pauseTimer();
  
  console.log('Session completed');
  
  // Play notification sound using offscreen document
  playNotificationSound();
  
  // Show notification WITH sound (remove silent property)
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icon48.png',
    title: 'Pomodoro Timer',
    message: getSessionCompleteMessage()
  }, (notificationId) => {
    if (chrome.runtime.lastError) {
      console.error('Notification failed:', chrome.runtime.lastError);
    } else {
      console.log('Notification created successfully:', notificationId);
    }
  });
  
  // Move to next session
  nextSession();
  
  // Mark that a session was completed (for popup to detect)
  timerState.sessionCompleted = true;
}

async function playNotificationSound() {
  try {
    // Create offscreen document if it doesn't exist
    await createOffscreenDocument();
    
    // Send message to offscreen document to play sound
    chrome.runtime.sendMessage({ action: 'playNotificationSound' }, (response) => {
      if (response && response.success) {
        console.log('Background sound played successfully');
      } else {
        console.error('Background sound failed:', response?.error);
      }
    });
  } catch (error) {
    console.error('Failed to play notification sound:', error);
  }
}

async function createOffscreenDocument() {
  // Check if offscreen document already exists
  const existingContexts = await chrome.runtime.getContexts({
    contextTypes: ['OFFSCREEN_DOCUMENT'],
    documentUrls: [chrome.runtime.getURL('offscreen.html')]
  });

  if (existingContexts.length > 0) {
    return; // Already exists
  }

  // Create offscreen document
  await chrome.offscreen.createDocument({
    url: 'offscreen.html',
    reasons: ['AUDIO_PLAYBACK'],
    justification: 'Play notification sound when Pomodoro timer completes'
  });
}

function nextSession() {
  if (timerState.currentSession === 'work') {
    timerState.completedSessions++;
    if (timerState.completedSessions % timerState.settings.sessionsBeforeLongBreak === 0) {
      timerState.currentSession = 'longBreak';
      timerState.timeLeft = timerState.settings.longBreakDuration * 60;
    } else {
      timerState.currentSession = 'shortBreak';
      timerState.timeLeft = timerState.settings.shortBreakDuration * 60;
    }
  } else {
    timerState.currentSession = 'work';
    timerState.timeLeft = timerState.settings.workDuration * 60;
  }
}

function updateSettings(newSettings) {
  timerState.settings = { ...newSettings };
  resetTimer();
}

function getSessionCompleteMessage() {
  switch (timerState.currentSession) {
    case 'work':
      return 'Work session complete! Time for a break.';
    case 'shortBreak':
      return 'Short break complete! Ready to work?';
    case 'longBreak':
      return 'Long break complete! Ready to work?';
    default:
      return 'Session complete!';
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${secs}`;
}