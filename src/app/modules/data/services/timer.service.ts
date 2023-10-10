import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class TimerService {


  private static readonly DEFAULT_MINUTES = 1;
  private alarmSound = new Audio('/assets/alarm.wav');

  private minutesSource = new BehaviorSubject<number>(TimerService.DEFAULT_MINUTES);
  private secondsSource = new BehaviorSubject<number>(0);
  private isRunningSource = new BehaviorSubject<boolean>(false);

  minutes$ = this.minutesSource.asObservable();
  seconds$ = this.secondsSource.asObservable();
  isRunning$ = this.isRunningSource.asObservable();

  intervalId: any;

  constructor() { 
    this.loadFromLocalStorage();
  }

  startTimer(): void {
    if (!this.intervalId) {
        const pauseTime = localStorage.getItem('timerPauseTime');
        if (pauseTime) {
            const timeAdjustment = new Date().getTime() - Number(pauseTime);
            const oldStartTime = Number(localStorage.getItem('timerStartTime'));
            const newStartTime = oldStartTime + timeAdjustment;
            localStorage.setItem('timerStartTime', String(newStartTime));
        } else {
            // Si no hay un tiempo de pausa, establece un nuevo tiempo de inicio
            localStorage.setItem('timerStartTime', String(new Date().getTime()));
        }

        // Elimina el tiempo de pausa solo si existe
        if (pauseTime) {
            localStorage.removeItem('timerPauseTime');
        }

        this.isRunningSource.next(true);
        this.intervalId = setInterval(() => this.updateTimer(), 1000);
    }
  }

  stopTimer(): void {
      if (this.intervalId) {
        this.isRunningSource.next(false);
        clearInterval(this.intervalId);
        this.intervalId = null;
        localStorage.removeItem('timerStartTime');
        localStorage.setItem('timerPauseTime', String(new Date().getTime()));
      }
  }


  resetTimer(): void {
    this.stopTimer();
    this.minutesSource.next(TimerService.DEFAULT_MINUTES);
    this.secondsSource.next(0);
    localStorage.removeItem('timerStartTime');
    localStorage.removeItem('timerPauseTime');
}

pauseTimer(): void {
  if (this.intervalId) {
      this.isRunningSource.next(false);
      clearInterval(this.intervalId);
      this.intervalId = null;
      localStorage.setItem('timerPauseTime', String(new Date().getTime()));
  }
}

private updateTimer(): void {
    const startTime = localStorage.getItem('timerStartTime');
    if (!startTime) return;

    const elapsedSeconds = Math.floor((new Date().getTime() - Number(startTime)) / 1000);
    const totalSeconds = TimerService.DEFAULT_MINUTES * 60;
    const remainingSeconds = totalSeconds - elapsedSeconds;

    if (remainingSeconds <= 0) {
        this.stopTimer();
        this.resetTimer();
        this.playAlarm();
    } else {
        this.minutesSource.next(Math.floor(remainingSeconds / 60));
        this.secondsSource.next(remainingSeconds % 60);
    }
}

  private loadFromLocalStorage(): void {
    const isRunning = localStorage.getItem('timerStartTime');
    if (isRunning) {
      this.isRunningSource.next(true);
      this.updateTimer();
      this.intervalId = setInterval(() => this.updateTimer(), 1000);
    }
  }

  private playAlarm(): void {
    this.alarmSound.play();
}
 
}
