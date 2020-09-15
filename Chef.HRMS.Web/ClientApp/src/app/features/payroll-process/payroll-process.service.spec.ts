import { TestBed } from '@angular/core/testing';

import { PayrollProcessService } from './payroll-process.service';

describe('PayrollProcessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PayrollProcessService = TestBed.inject(PayrollProcessService);
    expect(service).toBeTruthy();
  });
});
