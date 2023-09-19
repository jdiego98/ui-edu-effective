import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { DataRoutingModule } from './data-routing.module';
import { StatsComponent } from './components/stats/stats.component';
import { DataComponent } from './components/data/data.component';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    LayoutComponent,
    StatsComponent,
    DataComponent
  ],
  imports: [
    CommonModule,
    DataRoutingModule,
    MaterialModule,
    NgChartsModule,
  ]
})
export class DataModule { }
