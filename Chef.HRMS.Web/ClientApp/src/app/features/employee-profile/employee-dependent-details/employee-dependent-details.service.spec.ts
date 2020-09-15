import { TestBed } from '@angular/core/testing';

import { EmployeeDependentDetailsService } from './employee-dependent-details.service';

describe('EmployeeDependentDetailsService', () => {
  let service: EmployeeDependentDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeDependentDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
