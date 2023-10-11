import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudySessionsDialogComponent } from './study-sessions-dialog.component';

describe('StudySessionsDialogComponent', () => {
  let component: StudySessionsDialogComponent;
  let fixture: ComponentFixture<StudySessionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudySessionsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudySessionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
