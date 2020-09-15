import { TestBed } from '@angular/core/testing';

import { PayrollLoanAdvancesService } from './payroll-loan-advances.service';

describe('PayrollLoanAdvancesService', () => {
  let service: PayrollLoanAdvancesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayrollLoanAdvancesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
