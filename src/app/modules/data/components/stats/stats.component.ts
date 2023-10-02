import { Component } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { DailyStudyingService } from '../../services/daily-studying.service';
import { DailyStudying } from '../../models/daily-studying'
import { error } from 'console';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.sass']
})
export class StatsComponent {
  
  public dailyStudyingData: DailyStudying[] = []; // You'll fetch this from your service

  public lineChartData: any[] = [
    { 
      data: this.dailyStudyingData.map(ds => ds.pomodoros), 
      label: 'Pomodoros' 
    }
  ];

  public lineChartLabels: string[] = this.dailyStudyingData.map(ds => new Date(ds.dateOfCreation).toLocaleDateString());

  public lineChartOptions: any = {
    responsive: true,
    tooltips: {
      callbacks: {
        label: (tooltipItem: any, data: any) => {
          const index = tooltipItem.index;
          return `${data.labels[index]}: ${data.datasets[0].data[index]} Pomodoros - ${this.dailyStudyingData[index].description}`;
        }
      }
    }
  };

  public lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(0,123,255,0.2)',
      borderColor: 'rgba(0,123,255,1)',
      pointBackgroundColor: this.dailyStudyingData.map(ds => 'rgba(0,123,255,1)'),
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0,123,255,1)'
    }
  ];

  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';


  constructor(private dailyStudyingService: DailyStudyingService) {
    this.dailyStudyingService.getDailyStudying().subscribe({
      next: (res) =>{
        this.dailyStudyingData = res.dailyStudying;
        this.updateChartProperties();
      }, error: (err) =>{
        console.log(err)
      }
    })
   }

  private updateChartProperties(): void {
  this.lineChartData = [{
    data: this.dailyStudyingData.map(ds => ds.pomodoros), // Convert string to number
    label: 'Pomodoro'
  },
  {
    data: this.dailyStudyingData.map(ds => ds.description),
    label: 'Study Hours'
  }];

  

  this.lineChartLabels = this.dailyStudyingData.map(ds => {
    if (!ds.dateOfCreation) {
        console.error("Record without date encountered!");
        return "Unknown Date";
    }
    return new Date(ds.dateOfCreation).toLocaleDateString();
});

  this.lineChartColors = [{
    backgroundColor: 'rgba(0,123,255,0.2)',
    borderColor: 'rgba(0,123,255,1)',
    pointBackgroundColor: this.dailyStudyingData.map(ds => 'rgba(0,123,255,1)'),
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(0,123,255,1)'
  }];
}


  // public lineChartData: any[] = [
  //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  //   { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  // ];
  // public lineChartLabels: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  // public lineChartOptions: any = {
  //   responsive: true
  // };

  // public lineChartColors: Array<any> = [
  //   {
  //     backgroundColor: 'rgba(0,123,255,0.2)',
  //     borderColor: 'rgba(0,123,255,1)',
  //     pointBackgroundColor: ['rgba(0,123,255,1)', 'rgba(0,123,255,1)', 'rgba(255,0,0,1)', 'rgba(0,123,255,1)', 'rgba(0,123,255,1)', 'rgba(0,123,255,1)', 'rgba(0,123,255,1)'],
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(0,123,255,1)',
  //     pointRadius: [5, 5, 10, 5, 5, 5, 5]
  //   },
  //   {
  //     backgroundColor: 'rgba(255,0,255,0.2)',
  //     borderColor: 'rgba(255,0,255,1)',
  //     pointBackgroundColor: 'rgba(255,0,255,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(255,0,255,0.5)'
  //   }
  // ];

  // public lineChartLegend = true;
  // public lineChartType: ChartType = 'line';


}
