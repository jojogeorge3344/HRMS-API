import { TestBed } from '@angular/core/testing';

import { EmployeePrimaryDetailsService } from './employee-primary-details.service';

describe('EmployeePrimaryDetailsService', () => {
  let service: EmployeePrimaryDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeePrimaryDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
