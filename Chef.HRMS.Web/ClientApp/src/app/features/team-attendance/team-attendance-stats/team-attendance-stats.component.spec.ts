import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamAttendanceStatsComponent } from './team-attendance-stats.component';

describe('TeamAttendanceStatsComponent', () => {
  let component: TeamAttendanceStatsComponent;
  let fixture: ComponentFixture<TeamAttendanceStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamAttendanceStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamAttendanceStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
