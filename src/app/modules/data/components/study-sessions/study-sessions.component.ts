import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DailyStudyingService } from '../../services/daily-studying.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudySessionsDialogComponent } from '../study-sessions-dialog/study-sessions-dialog.component';
import { StudySessionService } from '../../services/study-session.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-study-sessions',
  templateUrl: './study-sessions.component.html',
  styleUrls: ['./study-sessions.component.sass']
})
export class StudySessionsComponent {


  dataSource = new MatTableDataSource<StudySession>([]);
  displayedColumns: string[] = ['Select', 'Name', 'Course', 'Project', 'Description', 'PomodorosExpected', 'PomodorosDone', 'Edit', 'Delete', 'Complete'];
  // selectedStudySession: StudySession | null = null;

  selection = new SelectionModel<StudySession>(false, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private studySessionService: StudySessionService, public dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadStudySessions();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // selectStudySession(session: StudySession) {
  //   this.studySessionService.setSelectedSession(session);
  //   // this.selectedStudySession = session;
  // }

//   selectStudySession(session: StudySession | null) {
//     if (!session) {
//         return;  // exit early if the session is null
//   }

//     // Toggle the current selection
//     this.selection.toggle(session);
    
//     if (this.selection.isSelected(session)) {
//         this.studySessionService.setSelectedSession(session);
//     } else {
//         // this.studySessionService.setSelectedSession(null);  // Clearing the session in service
//     }
// }

// selectStudySession(session: StudySession | null) {
//   // If the session is null or undefined, simply return
//   if (!session) return;

//   if (this.selection.isSelected(session)) {
//       // If session is already selected, this means we are going to deselect it
//       this.selection.deselect(session);
//       this.updateTimerForDeselection(session);
//   } else {
//       // Otherwise, we are selecting the session
//       this.selection.select(session);
//       this.updateTimerForSelection(session);
//   }
// }

selectStudySession(session: StudySession | null) {
  if (!session) return;

  if (this.selection.isSelected(session)) {
      // Deselecting the session
      this.selection.deselect(session);
      this.studySessionService.setSelectedSession(null); 
  } else {
      // Selecting the session
      this.selection.select(session);
      this.studySessionService.setSelectedSession(session);
  }
}

  loadStudySessions(): void {
    this.studySessionService.getStudySessions().subscribe((studySessions) => {
      this.dataSource.data = studySessions.studySessions;
    })
  }

  createStudySession(): void {
    const dialogRef = this.dialog.open(StudySessionsDialogComponent, {
      width: '600px', 
      height: '600px',
      data: { mode: 'create' }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadStudySessions();
    });
  }

  editStudySession(studySession?: StudySession): void {
    const dialogRef = this.dialog.open(StudySessionsDialogComponent, {
      width: '600px', 
      height: '600px',
      data: { mode: 'edit', studySession }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadStudySessions();
    });
  }

  completeStudySession(studySession?: any): void {
    // Logic to mark the study session as completed
  }

  deleteStudySession(studySession?: any): void {
    this.studySessionService.deleteStudySession(studySession).subscribe({
      next: () => {
        this.snackBar.open('Se ha eliminado el registro', 'Close', { duration: 3000 });
        this.loadStudySessions();
      },
      error: (err) => {
        this.snackBar.open(err, 'Close', { duration: 3000 });
      }
    });
  } 
  
}

export interface StudySession {
  dateOfCreation?: Date;
  name: String;
  course: String;
  project: String;
  description: String;
  pomodorosSpected: number;
  pomodorosDone: number;
}


