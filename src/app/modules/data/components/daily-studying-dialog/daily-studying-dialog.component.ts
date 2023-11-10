import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DailyStudying } from '../../models/daily-studying';
import { DailyStudyingService } from '../../services/daily-studying.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-daily-studying-dialog',
  templateUrl: './daily-studying-dialog.component.html',
  styleUrls: ['./daily-studying-dialog.component.sass']
})
export class DataDialogComponent {

  form?: FormGroup;
  newDailyStudying: DailyStudying; 

  constructor(
    private fb: FormBuilder, 
    private dailyStudyingService: DailyStudyingService, 
    public dialogRef: MatDialogRef<DataDialogComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { mode: 'create' | 'edit'; dailyStudying?: DailyStudying }) { 

    this.newDailyStudying = {} as DailyStudying;    
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      pomodoros: ['', [Validators.required, Validators.min(0)]],  
      description: ['']
    });

    if (this.data.mode === 'edit' && this.data.dailyStudying) {
      this.newDailyStudying = this.data.dailyStudying;
      this.form = this.fb.group({
        pomodoros: [this.data.dailyStudying.pomodoros, [Validators.required, Validators.min(0)]],
        description: [this.data.dailyStudying.description, ]
      });
    } else {
      this.form = this.fb.group({
        pomodoros: ['', [Validators.required, Validators.min(0)]],
        description: ['']
      });
    }
  }

  onSubmit() {
    if (this.form?.valid && this.form) {
      this.newDailyStudying.pomodoros = this.form.get('pomodoros')?.value;
      this.newDailyStudying.description = this.form.get('description')?.value;

      if (this.data.mode === 'create') {
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
          }});
        } else if (this.data.mode === 'edit') {
          // this.newDailyStudying.dateOfCreation =

          this.dailyStudyingService.updateDailyStudying(this.newDailyStudying).subscribe({
            next: (res) => {
              this.dialogRef.close();
              this.snackBar.open('Se ha actualizado registrado!', 'Close', {
                duration: 3000,
              });
            },
            error: (error) => {
              this.snackBar.open('Hubo un error al editar el registro', 'Close', {
                duration: 3000,
              });
            }});
        }
    }
}

}
