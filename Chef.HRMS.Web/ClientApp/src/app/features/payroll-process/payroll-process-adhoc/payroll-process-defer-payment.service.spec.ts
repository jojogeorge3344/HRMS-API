import { TestBed } from '@angular/core/testing';

import { PayrollProcessDeferPaymentService } from './payroll-process-defer-payment.service';

describe('PayrollProcessDeferPaymentService', () => {
  let service: PayrollProcessDeferPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayrollProcessDeferPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
