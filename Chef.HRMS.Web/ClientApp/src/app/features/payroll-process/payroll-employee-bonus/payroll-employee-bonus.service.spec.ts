import { TestBed } from '@angular/core/testing';

import { PayrollEmployeeBonusService } from './payroll-employee-bonus.service';

describe('PayrollEmployeeBonusService', () => {
  let service: PayrollEmployeeBonusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayrollEmployeeBonusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
