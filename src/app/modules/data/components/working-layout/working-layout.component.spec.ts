import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingLayoutComponent } from './working-layout.component';

describe('WorkingLayoutComponent', () => {
  let component: WorkingLayoutComponent;
  let fixture: ComponentFixture<WorkingLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkingLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkingLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
