import { PomodoroState, SessionType, Settings} from '../types'


export class PomodoroTimer {
    private state: PomodoroState;
    private settings: Settings;
    private timerId: number | null = null;
    private onSessionEndCallBack?: () => void;
    constructor(settings: Settings) {
        this.settings = settings || {
            workDuration: 25,
            shortBreakDuration: 5,
            longBreakDuration: 15,
            sessionsBeforeLongBreak: 4,
            autoStartBreaks: false,
            autoStartWork: false
        };
        this.state = {
            currentSession: SessionType.Work,
            timeLeft: this.settings.workDuration * 60,
            isRunning: false,
            completedSessions: 0
        };
    }

    public onSessionEnd(callback: () => void) {
        this.onSessionEndCallBack = callback;
    }

    start() {
        if (this.state.isRunning) return; // Prevent multiple timers
        this.state.isRunning = true;
        if (this.timerId) clearInterval(this.timerId);
        // Logic to start the timer countdown
        this.timerId = window.setInterval(() => {
            if (this.state.timeLeft > 0) {
                this.state.timeLeft--;
            } else {
                if (this.onSessionEndCallBack) {
                    this.onSessionEndCallBack();
                }
                this.pause();
                this.nextSession();
            }
        }, 1000);
    }

    pause(){
        if(this.state.isRunning){
            this.state.isRunning = false;
            // Logic to pause the timer countdown
            if (this.timerId) {
                clearInterval(this.timerId);
                this.timerId = null;
            }
        }
    }

    reset() {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
        this.state.isRunning = false;
        this.state.timeLeft = this.settings.workDuration * 60;
        this.state.completedSessions = 0;
        this.state.currentSession = SessionType.Work;
    }

    updateSettings(newSettings: Settings){
        this.settings = { ...newSettings };
        this.reset();
    }

    nextSession() {
        if (this.state.currentSession === SessionType.Work) {
            this.state.completedSessions++;
            if (this.state.completedSessions % this.settings.sessionsBeforeLongBreak === 0) {
                this.state.currentSession = SessionType.LongBreak;
                this.state.timeLeft = this.settings.longBreakDuration * 60;
            } else {
                this.state.currentSession = SessionType.ShortBreak;
                this.state.timeLeft = this.settings.shortBreakDuration * 60;
            }

        } else if (this.state.currentSession === SessionType.ShortBreak || this.state.currentSession === SessionType.LongBreak) {
            this.state.currentSession = SessionType.Work;
            this.state.timeLeft = this.settings.workDuration * 60;
        }
        this.state.isRunning = false;
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
        if ((this.state.currentSession === SessionType.ShortBreak && this.settings.autoStartBreaks) ||
            (this.state.currentSession === SessionType.LongBreak && this.settings.autoStartBreaks) ||
            (this.state.currentSession === SessionType.Work && this.settings.autoStartWork)) {
            this.start();
        }   
    }

    getState() {
        return { ...this.state };
    }
    getTimeRemaining() {
        const minutes = Math.floor(this.state.timeLeft / 60).toString().padStart(2, '0');
        const seconds = (this.state.timeLeft % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    }
}
