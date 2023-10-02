import { Component } from '@angular/core';
import { DailyStudyingService } from '../../services/daily-studying.service';
import { MatDialog } from '@angular/material/dialog';
import { DataDialogComponent } from '../data-dialog/data-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.sass']
})
export class DataComponent {

  submittedData: DailyStudying[] = [];
  displayedColumns: string[] = ['DateOfCreation', 'Pomodors', 'Description', 'Edit', 'Delete'];

  constructor(private dailyStudyingService: DailyStudyingService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

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
      data: { mode: 'create' }
      // other configuration here
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadDailyStudying()
    });
  }

  editDailyStudying(dailyStudying?: any): void{
    const dialogRef = this.dialog.open(DataDialogComponent, {
      width: '500px',
      data: { mode: 'edit', dailyStudying }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadDailyStudying()
    });
  }

  onSearch(event: KeyboardEvent): void{
    const inputValue = (event.target as HTMLInputElement).value;
  }

  deleteDailyStudying(dailyStudying?: any): void{
    this.dailyStudyingService.deleteDailyStudying(dailyStudying).subscribe({
      next: (res) =>{
        this.snackBar.open('Se ha eliminado el registro', 'Close',{
          duration: 3000
        });
        this.loadDailyStudying();
      }, error: (err) => {
        this.snackBar.open(err, 'Close', {
          duration: 3000
        })
      }
    })
  }
  
}

export interface DailyStudying {
  DateOfCreation: Date;
  Pomodors: number;
  Description: string;
}