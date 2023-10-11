import { Component, ViewChild } from '@angular/core';
import { DailyStudyingService } from '../../services/daily-studying.service';
import { MatDialog } from '@angular/material/dialog';
import { DataDialogComponent } from '../daily-studying-dialog/daily-studying-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-daily-studying',
  templateUrl: './daily-studying.component.html',
  styleUrls: ['./daily-studying.component.sass']
})
export class DataComponent {

  // submittedData: DailyStudying[] = [];
  dataSource = new MatTableDataSource<DailyStudying>([]);
  displayedColumns: string[] = ['DateOfCreation', 'Pomodors', 'Description', 'Edit', 'Delete'];

  // dateFilterForm: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dailyStudyingService: DailyStudyingService, public dialog: MatDialog, private snackBar: MatSnackBar) {
    // this.dateFilterForm = new FormGroup({
    //   startDate: new FormControl(''),
    //   endDate: new FormControl('')
    // });
   }

  ngOnInit(): void {
    this.loadDailyStudying();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadDailyStudying(): void{
    this.dailyStudyingService.getDailyStudying().subscribe((dailyStudying) => {
      this.dataSource.data = dailyStudying.dailyStudying;
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

  // filterByDate(): void {
  //   const startDate = new Date(this.dateFilterForm.value.startDate);
  //   const endDate = new Date(this.dateFilterForm.value.endDate);
  
  //   if (startDate && endDate) {
  //     const filteredData = this.dataSource.data.filter(item => {
  //       const itemDate = new Date(item.DateOfCreation);
  //       return itemDate >= startDate && itemDate <= endDate;
  //     });
  
  //     this.dataSource.data = filteredData;
  //   } else {
  //     this.loadDailyStudying(); // Si las fechas no están definidas, carga todos los datos nuevamente.
  //   }
  // }
  
 

}

export interface DailyStudying {
  DateOfCreation: Date;
  Pomodors: number;
  Description: string;
}