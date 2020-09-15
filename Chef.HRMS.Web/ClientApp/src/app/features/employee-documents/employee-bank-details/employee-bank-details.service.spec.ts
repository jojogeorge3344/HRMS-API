import { TestBed } from '@angular/core/testing';

import { EmployeeBankDetailsService } from './employee-bank-details.service';

describe('EmployeeBankDetailsService', () => {
  let service: EmployeeBankDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeBankDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
