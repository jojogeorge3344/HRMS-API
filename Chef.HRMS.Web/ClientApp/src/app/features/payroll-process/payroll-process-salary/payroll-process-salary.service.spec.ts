import { TestBed } from '@angular/core/testing';

import { PayrollProcessSalaryService } from './payroll-process-salary.service';

describe('PayrollProcessSalaryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PayrollProcessSalaryService = TestBed.get(PayrollProcessSalaryService);
    expect(service).toBeTruthy();
  });
});
