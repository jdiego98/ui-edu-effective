import { Component } from '@angular/core';
import { TimerService } from '../../services/timer.service';
import { Subscription } from 'rxjs';
import { StudySessionService } from '../../services/study-session.service';
import { StudySession } from '../study-sessions/study-sessions.component';

@Component({
  selector: 'app-pomo-timer',
  templateUrl: './pomo-timer.component.html',
  styleUrls: ['./pomo-timer.component.sass']
})
export class PomoTimerComponent {

  minutes: number | undefined;
  seconds: number | undefined;
  isRunning: boolean | undefined;
  selectedStudySession: StudySession | null = null;
  
  // private studySessionSubscription: Subscription;
  private subscriptions: Subscription[] = [];

  constructor(private timerService: TimerService, private studySessionService: StudySessionService) {}

  ngOnInit() {
      this.subscriptions.push(
          this.timerService.minutes$.subscribe(minutes => this.minutes = minutes),
          this.timerService.seconds$.subscribe(seconds => this.seconds = seconds),
          this.timerService.isRunning$.subscribe(isRunning => this.isRunning = isRunning),
          this.studySessionService.getSelectedSession().subscribe(studySession => this.selectedStudySession = studySession),         
      );

      this.timerService.timerComplete$.subscribe({
        next: () => {
          if (this.selectedStudySession) {
            this.selectedStudySession.pomodorosDone += 1;
            this.studySessionService.updateStudySession(this.selectedStudySession).subscribe(updatedSession => {
              // Handle successful update, e.g., refresh data or show a notification.
            }, error => {
              // Handle error, e.g., show an error message.
            });
          }
        },
        error: error => {
          // Handle error
        },
        complete: () => {
          // Complete callback
        }
      });
    

      // this.studySessionSubscription = this.studySessionService.getSelectedSession().subscribe(session => {
      //   this.selectedStudySession = session;
      // });
  }

  ngOnDestroy(): void {
    this.timerService.stopTimer();
    this.subscriptions.forEach(sub => sub.unsubscribe()); 
    this.timerService.timerComplete$.unsubscribe();
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
