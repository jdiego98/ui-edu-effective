import { Component, OnDestroy } from '@angular/core';
import { Subscription,combineLatest } from 'rxjs';
import { TimerService } from './modules/data/services/timer.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnDestroy {
  private timerSubscription: Subscription;

  constructor(private timerService: TimerService, private titleService: Title) {
    this.timerSubscription = combineLatest([
      this.timerService.minutes$,
      this.timerService.seconds$
    ]).subscribe(([minutes, seconds]) => {
      this.titleService.setTitle(`${minutes}:${seconds < 10 ? '0' + seconds : seconds} - EduEffective`);
    });
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
