import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { DataRoutingModule } from './data-routing.module';
import { StatsComponent } from './components/stats/stats.component';
import { DataComponent } from './components/data/data.component';
import { NgChartsModule } from 'ng2-charts';
import { DataDialogComponent } from './components/data-dialog/data-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LayoutComponent,
    StatsComponent,
    DataComponent,
    DataDialogComponent
  ],
  imports: [
    CommonModule,
    DataRoutingModule,
    MaterialModule,
    NgChartsModule,
    ReactiveFormsModule,
  ]
})
export class DataModule { }
