import { TestBed } from '@angular/core/testing';

import { EmployeeDrivingLicenseDetailsService } from './employee-driving-license-details.service';

describe('EmployeeDrivingLicenseDetailsService', () => {
  let service: EmployeeDrivingLicenseDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeDrivingLicenseDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
