import { Component } from '@angular/core';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.sass']
})
export class StatsComponent {

  public lineChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];
  public lineChartLabels: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(0,123,255,0.2)',
      borderColor: 'rgba(0,123,255,1)',
      pointBackgroundColor: 'rgba(0,123,255,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0,123,255,1)'
    },
    {
      backgroundColor: 'rgba(255,0,255,0.2)',
      borderColor: 'rgba(255,0,255,1)',
      pointBackgroundColor: 'rgba(255,0,255,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,0,255,0.5)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';


}
