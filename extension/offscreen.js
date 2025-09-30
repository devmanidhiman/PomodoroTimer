// Offscreen document script - handles audio playback
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'playNotificationSound') {
    const audio = document.getElementById('notification-audio');
    if (audio) {
      audio.currentTime = 0;
      audio.play().then(() => {
        console.log('Offscreen audio played successfully');
        sendResponse({ success: true });
      }).catch(error => {
        console.error('Offscreen audio failed:', error);
        sendResponse({ success: false, error: error.message });
      });
    }
  }
});