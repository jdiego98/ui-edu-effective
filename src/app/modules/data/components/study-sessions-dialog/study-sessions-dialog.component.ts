import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudySession } from '../study-sessions/study-sessions.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudySessionService } from '../../services/study-session.service';

@Component({
  selector: 'app-study-sessions-dialog',
  templateUrl: './study-sessions-dialog.component.html',
  styleUrls: ['./study-sessions-dialog.component.sass']
})
export class StudySessionsDialogComponent {
  form?: FormGroup;
  newStudySession: StudySession;

  constructor(
    private fb: FormBuilder,
    private studySessionService: StudySessionService,
    public dialogRef: MatDialogRef<StudySessionsDialogComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { mode: 'create' | 'edit'; studySession?: StudySession }
  ) {
    this.newStudySession = {} as StudySession;
  }

  ngOnInit(): void {
    this.initForm();

    if (this.data.mode === 'edit' && this.data.studySession) {
      this.newStudySession = this.data.studySession;
      console.log(this.data.studySession); // Log to see the structure
      this.form?.patchValue(this.data.studySession);
    }
  }

  private initForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      course: ['', Validators.required],
      project: ['', Validators.required],
      description: ['', Validators.required],
      pomodorosSpected: ['', [Validators.required, Validators.min(0)]],
      pomodorosDone: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.form?.valid && this.form) {

      if (!this.form.value.pomosDone) {
        this.form.value.pomosDone = 0;
    }

    const formValues = this.form.value;

    this.newStudySession = {
      name: formValues.name,
      course: formValues.course,
      project: formValues.project,
      description: formValues.description,
      pomodorosSpected: formValues.pomodorosSpected,
      pomodorosDone: formValues.pomodorosDone || 0,
      dateOfCreation: this.data.studySession?.dateOfCreation  // default to 0 if not set
    };

      // Object.assign(this.newStudySession, this.form.value);

      if (this.data.mode === 'create') {
        this.studySessionService.createStudySession(this.newStudySession).subscribe({
          next: () => {
            this.dialogRef.close();
            this.snackBar.open('Se ha registrado!', 'Close', { duration: 3000 });
          },
          error: (err) => {
            console.log(err)
            this.snackBar.open('Hubo un error al crear el registro', 'Close', { duration: 3000 });
          }
        });
      } else if (this.data.mode === 'edit') {
        this.studySessionService.updateStudySession(this.newStudySession).subscribe({
          next: () => {
            this.dialogRef.close();
            this.snackBar.open('Se ha actualizado registrado!', 'Close', { duration: 3000 });
          },
          error: (err) => {
            console.log(err)
            this.snackBar.open('Hubo un error al editar el registro', 'Close', { duration: 3000 });
          }
        });
      }
    }
  }
}
