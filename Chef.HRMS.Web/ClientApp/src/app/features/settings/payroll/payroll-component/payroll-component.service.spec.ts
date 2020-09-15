import { TestBed } from '@angular/core/testing';

import { PayrollComponentService } from './payroll-component.service';

describe('PayrollComponentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PayrollComponentService = TestBed.inject(PayrollComponentService);
    expect(service).toBeTruthy();
  });
});
