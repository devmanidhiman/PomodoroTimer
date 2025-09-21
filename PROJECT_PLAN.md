# 🍅 Pomodoro Timer - TypeScript Learning Project Plan

## Project Overview
**Goal**: Build a Pomodoro Timer application in TypeScript that can be used as both a web application and Chrome extension.

**Learning Objectives**:
1. Master TypeScript fundamentals and advanced concepts
2. Create a portfolio-worthy project for job applications
3. Learn modern development tooling and best practices
4. Build and deploy a Chrome extension

---

## 🏗️ Architecture & Tech Stack

### Core Technologies
- **TypeScript** - Strong typing, interfaces, classes, generics
- **Vite** - Modern build tool for fast development
- **ESLint + Prettier** - Code quality and formatting
- **HTML5/CSS3** - Simple, clean UI

### Architecture Pattern
- **Model-View-Controller (MVC)** - Clean separation of concerns
- **Observer Pattern** - For timer state management and UI updates
- **Class-based OOP** - Showcasing TypeScript's object-oriented features

### Project Structure
```
src/
├── index.html          # Main HTML file
├── main.ts            # Application entry point
├── types/             # TypeScript type definitions
│   ├── index.ts       # Main type exports
│   └── pomodoro.ts    # Pomodoro-specific types
├── models/            # Business logic and data
│   ├── PomodoroTimer.ts    # Core timer class
│   ├── PomodoroSession.ts  # Session management
│   └── Settings.ts         # User preferences
├── views/             # UI components and DOM manipulation
│   ├── TimerView.ts   # Timer display component
│   ├── ControlsView.ts # Button controls
│   └── SettingsView.ts # Settings panel
└── controllers/       # Coordination between models and views
    └── AppController.ts # Main application controller
```

---

## 📚 Phase-by-Phase Learning Plan

### Phase 1: Project Foundation ✅ COMPLETED
**What you'll learn**: Project setup, modern tooling, TypeScript configuration

**Tasks Completed**:
- [x] Initialize Node.js project with npm
- [x] Configure TypeScript with strict type checking
- [x] Set up Vite for fast development and building
- [x] Configure ESLint and Prettier for code quality
- [x] Create MVC folder structure
- [x] Set up development server

**TypeScript Concepts Covered**:
- TypeScript configuration (`tsconfig.json`)
- Module system and imports/exports
- Development vs production builds

---

### Phase 2: TypeScript Types & Interfaces
**What you'll learn**: Type definitions, interfaces, enums, union types

**Tasks to Complete**:
- [ ] Define Pomodoro-specific types and interfaces
- [ ] Create enums for timer states and session types
- [ ] Set up configuration interfaces for settings
- [ ] Learn about union types and type guards

**TypeScript Concepts to Learn**:
```typescript
// Interfaces
interface PomodoroSettings {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
}

// Enums
enum TimerState {
  IDLE = 'idle',
  RUNNING = 'running',
  PAUSED = 'paused'
}

// Union Types
type SessionType = 'work' | 'shortBreak' | 'longBreak';

// Type Guards
function isWorkSession(session: SessionType): session is 'work' {
  return session === 'work';
}
```

**Files to Create**:
- `src/types/pomodoro.ts` - All Pomodoro-related type definitions
- `src/types/index.ts` - Main type exports

---

### Phase 3: Core Business Logic (Models)
**What you'll learn**: Classes, methods, private/public access, inheritance

**Tasks to Complete**:
- [ ] Create `PomodoroTimer` class with timer logic
- [ ] Implement `PomodoroSession` class for session management
- [ ] Build `Settings` class for user preferences
- [ ] Add event handling with custom events

**TypeScript Concepts to Learn**:
```typescript
// Classes with access modifiers
class PomodoroTimer {
  private currentTime: number;
  private isRunning: boolean;
  protected timerId?: number;
  
  public start(): void { /* implementation */ }
  private tick(): void { /* implementation */ }
}

// Inheritance and method overriding
class AdvancedTimer extends PomodoroTimer {
  public override start(): void {
    super.start();
    // Additional logic
  }
}

// Generics
class EventEmitter<T> {
  private listeners: Array<(data: T) => void> = [];
  
  public emit(data: T): void {
    this.listeners.forEach(listener => listener(data));
  }
}
```

**Files to Create**:
- `src/models/PomodoroTimer.ts` - Core timer functionality
- `src/models/PomodoroSession.ts` - Session and cycle management
- `src/models/Settings.ts` - User preferences and persistence

---

### Phase 4: UI Components (Views)
**What you'll learn**: DOM manipulation, event handling, TypeScript with HTML elements

**Tasks to Complete**:
- [ ] Create `TimerView` class for display updates
- [ ] Build `ControlsView` class for button interactions
- [ ] Implement `SettingsView` class for configuration panel
- [ ] Learn DOM type safety with TypeScript

**TypeScript Concepts to Learn**:
```typescript
// DOM Type Safety
class TimerView {
  private timerElement: HTMLElement;
  private statusElement: HTMLElement;
  
  constructor() {
    // Type assertion with null checking
    this.timerElement = document.getElementById('timer-display')!;
    
    // Optional chaining and type guards
    const element = document.querySelector('.status') as HTMLElement | null;
    if (element) {
      this.statusElement = element;
    }
  }
  
  // Event handling with proper types
  private handleClick = (event: MouseEvent): void => {
    const target = event.target as HTMLButtonElement;
    // Handle click
  }
}

// Generic utility functions
function getElement<T extends HTMLElement>(selector: string): T | null {
  return document.querySelector(selector) as T | null;
}
```

**Files to Create**:
- `src/views/TimerView.ts` - Timer display and formatting
- `src/views/ControlsView.ts` - Button controls and interactions
- `src/views/SettingsView.ts` - Settings panel management

---

### Phase 5: Application Coordination (Controllers)
**What you'll learn**: Observer pattern, async/await, application architecture

**Tasks to Complete**:
- [ ] Create `AppController` to coordinate models and views
- [ ] Implement observer pattern for state updates
- [ ] Add local storage for settings persistence
- [ ] Handle application lifecycle events

**TypeScript Concepts to Learn**:
```typescript
// Observer Pattern
interface Observer<T> {
  update(data: T): void;
}

class Subject<T> {
  private observers: Observer<T>[] = [];
  
  public subscribe(observer: Observer<T>): void {
    this.observers.push(observer);
  }
  
  protected notify(data: T): void {
    this.observers.forEach(observer => observer.update(data));
  }
}

// Async/Await with proper typing
class AppController {
  public async initialize(): Promise<void> {
    try {
      await this.loadSettings();
      await this.setupEventListeners();
    } catch (error) {
      console.error('Initialization failed:', error);
    }
  }
  
  private async loadSettings(): Promise<Settings> {
    // Async operations with proper error handling
  }
}
```

**Files to Create**:
- `src/controllers/AppController.ts` - Main application controller

---

### Phase 6: Chrome Extension Adaptation
**What you'll learn**: Browser APIs, Chrome extension architecture, manifest files

**Tasks to Complete**:
- [ ] Create `manifest.json` for Chrome extension
- [ ] Adapt UI for extension popup
- [ ] Add Chrome storage API for settings
- [ ] Implement background script for notifications
- [ ] Add extension-specific features (notifications, badge)

**TypeScript Concepts to Learn**:
```typescript
// Chrome API typing
declare namespace chrome {
  namespace storage {
    namespace local {
      function get(keys: string[]): Promise<Record<string, any>>;
      function set(items: Record<string, any>): Promise<void>;
    }
  }
}

// Extension-specific features
class ExtensionController extends AppController {
  protected async saveSettings(settings: Settings): Promise<void> {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      await chrome.storage.local.set({ settings });
    } else {
      // Fallback to localStorage for web version
      localStorage.setItem('settings', JSON.stringify(settings));
    }
  }
}
```

**Files to Create**:
- `manifest.json` - Extension configuration
- `src/extension/` - Extension-specific code
- `src/extension/background.ts` - Background script
- `src/extension/popup.html` - Extension popup

---

### Phase 7: Testing & Documentation
**What you'll learn**: Unit testing, documentation, deployment

**Tasks to Complete**:
- [ ] Add unit tests with Jest or Vitest
- [ ] Write comprehensive README.md
- [ ] Add JSDoc comments for better documentation
- [ ] Prepare for GitHub upload and portfolio presentation

**TypeScript Concepts to Learn**:
```typescript
// Unit testing with proper types
import { describe, it, expect, beforeEach } from 'vitest';
import { PomodoroTimer } from '../src/models/PomodoroTimer';

describe('PomodoroTimer', () => {
  let timer: PomodoroTimer;
  
  beforeEach(() => {
    timer = new PomodoroTimer();
  });
  
  it('should initialize with correct default values', () => {
    expect(timer.getCurrentTime()).toBe(25 * 60 * 1000);
    expect(timer.isRunning()).toBe(false);
  });
});

// JSDoc documentation
/**
 * Represents a Pomodoro timer with work and break cycles
 * @example
 * ```typescript
 * const timer = new PomodoroTimer();
 * timer.start();
 * ```
 */
class PomodoroTimer {
  /**
   * Starts the timer
   * @param {SessionType} sessionType - The type of session to start
   * @returns {Promise<void>} Promise that resolves when timer starts
   */
  public async start(sessionType: SessionType): Promise<void> {
    // Implementation
  }
}
```

---

## 🎯 Learning Checkpoints

After each phase, you should be able to answer these questions:

### Phase 2 Checkpoint:
- How do interfaces differ from types in TypeScript?
- When should you use enums vs union types?
- How do type guards help with type safety?

### Phase 3 Checkpoint:
- What are access modifiers and when to use them?
- How does inheritance work in TypeScript?
- What are generics and why are they useful?

### Phase 4 Checkpoint:
- How does TypeScript help with DOM manipulation?
- What is type assertion and when is it necessary?
- How to properly type event handlers?

### Phase 5 Checkpoint:
- How does the observer pattern improve code organization?
- How to properly handle async operations in TypeScript?
- What are the benefits of dependency injection?

### Phase 6 Checkpoint:
- How to type external APIs like Chrome extensions?
- How to handle environment-specific code?
- What are declaration files and how to use them?

---

## 📝 Key Features to Implement

### Core Features:
1. **Timer Functionality**
   - 25-minute work sessions
   - 5-minute short breaks
   - 20-30 minute long breaks after 4 sessions
   - Visual and audio notifications

2. **User Interface**
   - Large timer display
   - Start/Pause/Reset controls
   - Session progress indicator
   - Settings panel

3. **Settings**
   - Customizable timer durations
   - Sound preferences
   - Auto-start options
   - Theme selection

4. **Chrome Extension Features**
   - Popup interface
   - Badge updates with remaining time
   - Desktop notifications
   - Background operation

### Advanced Features (Optional):
- Statistics tracking
- Daily/weekly reports
- Task integration
- Productivity insights

---

## 🚀 Deployment Plan

### Web Application:
1. Build production version with `npm run build`
2. Deploy to GitHub Pages or Netlify
3. Add to portfolio with live demo

### Chrome Extension:
1. Create production build for extension
2. Package as .zip file
3. Test in developer mode
4. Submit to Chrome Web Store (optional)

### GitHub Repository:
1. Comprehensive README with setup instructions
2. Code examples and screenshots
3. Live demo links
4. Professional commit history

---

## 💼 Portfolio Presentation Points

This project demonstrates:
- **Modern TypeScript** - Interfaces, classes, generics, strict typing
- **Clean Architecture** - MVC pattern, separation of concerns
- **Modern Tooling** - Vite, ESLint, Prettier, npm scripts
- **Cross-Platform Development** - Web app + Chrome extension
- **Professional Practices** - Testing, documentation, code quality
- **Problem-Solving** - Real-world application with practical use

---

## 📚 Additional Learning Resources

### TypeScript Documentation:
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)

### Best Practices:
- [TypeScript Do's and Don'ts](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Clean Code TypeScript](https://github.com/labs42io/clean-code-typescript)

### Chrome Extension Development:
- [Chrome Extension Developer Guide](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 Documentation](https://developer.chrome.com/docs/extensions/mv3/)

---

**Remember**: The goal is learning TypeScript deeply, not just building an app. Take time to understand each concept, experiment with the code, and ask questions about anything that's unclear!

---

*This plan is designed to be your learning companion. Feel free to adjust the pace and dive deeper into concepts that interest you most. Happy coding! 🚀*