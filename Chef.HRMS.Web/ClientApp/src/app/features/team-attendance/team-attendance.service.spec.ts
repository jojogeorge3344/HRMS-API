import { TestBed } from '@angular/core/testing';

import { TeamAttendanceService } from './team-attendance.service';

describe('TeamAttendanceService', () => {
  let service: TeamAttendanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamAttendanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
