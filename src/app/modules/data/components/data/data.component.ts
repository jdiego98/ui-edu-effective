import { Component } from '@angular/core';
import { DailyStudyingService } from '../../services/daily-studying.service';
import { MatDialog } from '@angular/material/dialog';
import { DataDialogComponent } from '../data-dialog/data-dialog.component';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.sass']
})
export class DataComponent {

  submittedData: DailyStudying[] = [];
  displayedColumns: string[] = ['DateOfCreation', 'Pomodors', 'Description', 'Edit', 'Delete'];

  constructor(private dailyStudyingService: DailyStudyingService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadDailyStudying();
  }

  loadDailyStudying(): void{
    this.dailyStudyingService.getDailyStudying().subscribe((dailyStudying) => {
      this.submittedData = dailyStudying.dailyStudying;
    })
  }

  createDailyStudying(): void {
    const dialogRef = this.dialog.open(DataDialogComponent, {
      width: '500px',
      // other configuration here
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadDailyStudying()
    });
  }

  editDailyStudying(element?: any): void{

  }

  onSearch(event: KeyboardEvent): void{
    const inputValue = (event.target as HTMLInputElement).value;
  }

  deleteDailyStudying(element?: any): void{

  }
  
}

export interface DailyStudying {
  DateOfCreation: Date;
  Pomodors: number;
  Description: string;
}