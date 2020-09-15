import { TestBed } from '@angular/core/testing';

import { EmployeeWFHService } from './employee-wfh.service';

describe('EmployeeWFHService', () => {
  let service: EmployeeWFHService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeWFHService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
