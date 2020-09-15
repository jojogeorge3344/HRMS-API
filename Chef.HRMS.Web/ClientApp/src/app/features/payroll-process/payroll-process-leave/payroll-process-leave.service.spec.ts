import { TestBed } from '@angular/core/testing';

import { PayrollProcessLeaveService } from './payroll-process-leave.service';

describe('PayrollProcessLeaveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PayrollProcessLeaveService = TestBed.inject(PayrollProcessLeaveService);
    expect(service).toBeTruthy();
  });
});
