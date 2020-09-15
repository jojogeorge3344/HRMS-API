import { TestBed } from '@angular/core/testing';

import { EmployeeAddressDetailsService } from './employee-address-details.service';

describe('EmployeeAddressDetailsService', () => {
  let service: EmployeeAddressDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeAddressDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
