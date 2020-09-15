import { TestBed } from '@angular/core/testing';

import { PayrollProcessBonusService } from './payroll-process-bonus.service';

describe('PayrollProcessBonusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PayrollProcessBonusService = TestBed.get(PayrollProcessBonusService);
    expect(service).toBeTruthy();
  });
});
