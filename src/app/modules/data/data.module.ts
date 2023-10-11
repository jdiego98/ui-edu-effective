import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { DataRoutingModule } from './data-routing.module';
import { StatsComponent } from './components/stats/stats.component';
import { DataComponent } from './components/daily-studying/daily-studying.component';
import { NgChartsModule } from 'ng2-charts';
import { DataDialogComponent } from './components/daily-studying-dialog/daily-studying-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PomoTimerComponent } from './components/pomo-timer/pomo-timer.component';
import { StudySessionsComponent } from './components/study-sessions/study-sessions.component';
import { DataLayoutComponent } from './components/data-layout/data-layout.component';
import { WorkingLayoutComponent } from './components/working-layout/working-layout.component';
import { FormsModule } from '@angular/forms';
import { StudySessionsDialogComponent } from './components/study-sessions-dialog/study-sessions-dialog.component';



@NgModule({
  declarations: [
    LayoutComponent,
    StatsComponent,
    DataComponent,
    DataDialogComponent,
    PomoTimerComponent,
    StudySessionsComponent,
    DataLayoutComponent,
    WorkingLayoutComponent,
    StudySessionsDialogComponent
  ],
  imports: [
    CommonModule,
    DataRoutingModule,
    MaterialModule,
    NgChartsModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class DataModule { }
