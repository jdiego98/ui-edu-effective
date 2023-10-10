import { Component } from '@angular/core';
import { TimerService } from '../../services/timer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pomo-timer',
  templateUrl: './pomo-timer.component.html',
  styleUrls: ['./pomo-timer.component.sass']
})
export class PomoTimerComponent {

  minutes: number | undefined;
  seconds: number | undefined;
  isRunning: boolean | undefined;

  private subscriptions: Subscription[] = [];

  constructor(private timerService: TimerService) {}

  ngOnInit() {
      this.subscriptions.push(
          this.timerService.minutes$.subscribe(minutes => this.minutes = minutes),
          this.timerService.seconds$.subscribe(seconds => this.seconds = seconds),
          this.timerService.isRunning$.subscribe(isRunning => this.isRunning = isRunning)
      );
  }

  ngOnDestroy(): void {
    this.timerService.stopTimer();
  }

  startTimer(): void {
    this.timerService.startTimer();
  }

  stopTimer(): void {
    this.timerService.stopTimer();
  }

  resetTimer(): void {
    this.timerService.resetTimer();
  }

  pauseTimer() {
    this.timerService.pauseTimer();
}


}
