import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamAttendanceLogComponent } from './team-attendance-log.component';

describe('TeamAttendanceLogComponent', () => {
  let component: TeamAttendanceLogComponent;
  let fixture: ComponentFixture<TeamAttendanceLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamAttendanceLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamAttendanceLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
