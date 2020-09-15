import { TestBed } from '@angular/core/testing';

import { EmployeeWpsService } from './employee-wps.service';

describe('EmployeeWpsService', () => {
  let service: EmployeeWpsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeWpsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
