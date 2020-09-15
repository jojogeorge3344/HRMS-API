import { TestBed } from '@angular/core/testing';

import { EmployeeJobFilingService } from './employee-job-filing.service';

describe('EmployeeJobFilingService', () => {
  let service: EmployeeJobFilingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeJobFilingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
