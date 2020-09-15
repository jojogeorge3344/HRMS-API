import { TestBed } from '@angular/core/testing';

import { EmployeeOnDutyService } from './employee-on-duty.service';

describe('EmployeeOnDutyService', () => {
  let service: EmployeeOnDutyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeOnDutyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
