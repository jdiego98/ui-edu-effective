import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DailyStudying } from '../../models/daily-studying';
import { DailyStudyingService } from '../../services/daily-studying.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-data-dialog',
  templateUrl: './data-dialog.component.html',
  styleUrls: ['./data-dialog.component.sass']
})
export class DataDialogComponent {

  form?: FormGroup;
  newDailyStudying: DailyStudying; 

  constructor(
    private fb: FormBuilder, 
    private dailyStudyingService: DailyStudyingService, 
    public dialogRef: MatDialogRef<DataDialogComponent>,
    private snackBar: MatSnackBar) { 
    this.newDailyStudying = {} as DailyStudying
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      pomodoros: ['', [Validators.required, Validators.min(1)]],  // al menos 1 pomodoro
      description: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form?.valid && this.form) {
      this.newDailyStudying.pomodoros = this.form?.get('pomodoros')?.value;
      this.newDailyStudying.description = this.form?.get('description')?.value;     

      this.dailyStudyingService.createDailyStudying(this.newDailyStudying).subscribe({
        next: (res) => {
          this.dialogRef.close();
          this.snackBar.open('Se ha registrado!', 'Close', {
            duration: 3000,
          });
        },
        error: (error) => {
          this.snackBar.open('Hubo un error al crear el registro', 'Close', {
            duration: 3000,
          });
        }
      }    
      );

    }
  }
}
