import { TestBed } from '@angular/core/testing';

import { EmployeeIdentityDetailsService } from './employee-identity-details.service';

describe('EmployeeIdentityDetailsService', () => {
  let service: EmployeeIdentityDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeIdentityDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
