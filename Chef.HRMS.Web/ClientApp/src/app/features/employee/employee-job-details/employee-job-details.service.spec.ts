import { TestBed } from '@angular/core/testing';

import { EmployeeJobDetailsService } from './employee-job-details.service';

describe('EmployeeJobDetailsService', () => {
  let service: EmployeeJobDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeJobDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
