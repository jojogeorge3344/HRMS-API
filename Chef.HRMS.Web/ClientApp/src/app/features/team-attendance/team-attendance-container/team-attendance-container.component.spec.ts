import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamAttendanceContainerComponent } from './team-attendance-container.component';

describe('TeamAttendanceContainerComponent', () => {
  let component: TeamAttendanceContainerComponent;
  let fixture: ComponentFixture<TeamAttendanceContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamAttendanceContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamAttendanceContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
