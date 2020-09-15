import { TestBed } from '@angular/core/testing';

import { PayrollCalculationService } from './payroll-calculation.service';

describe('PayrollCalculationService', () => {
  let service: PayrollCalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayrollCalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
