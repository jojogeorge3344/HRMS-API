import { TestBed } from '@angular/core/testing';

import { EmployeeWpsUserService } from './employee-wps.service';

describe('EmployeeWpsUserService', () => {
  let service: EmployeeWpsUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeWpsUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
