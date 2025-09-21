// Basic entry point to test our setup
console.log('🍅 Pomodoro Timer TypeScript Setup Complete!');

// Simple DOM test
document.addEventListener('DOMContentLoaded', () => {
  const timerDisplay = document.getElementById('timer-display');
  if (timerDisplay) {
    console.log('✅ DOM elements found successfully');
  }
});

// Type checking test
interface TestInterface {
  message: string;
  timestamp: Date;
}

const testData: TestInterface = {
  message: 'TypeScript is working!',
  timestamp: new Date(),
};

console.log('TypeScript Test:', testData);