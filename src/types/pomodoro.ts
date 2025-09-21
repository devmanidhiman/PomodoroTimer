export interface PomodoroState {
    currentSession: SessionType;
    timeLeft: number; // in seconds
    isRunning: boolean;
    completedSessions: number;
}

export interface Settings {
    workDuration: number; // in minutes
    shortBreakDuration: number; // in minutes
    longBreakDuration: number; // in minutes
    sessionsBeforeLongBreak: number;
    autoStartBreaks: boolean;
    autoStartWork: boolean;
}

// Current state of the timer
export enum TimerState {
    Idle = "idle",
    Running = "running",
    Paused = "paused"
}

// Type of session currently active
export enum SessionType {
    Work = "work",
    ShortBreak = "shortBreak",
    LongBreak = "longBreak"
}