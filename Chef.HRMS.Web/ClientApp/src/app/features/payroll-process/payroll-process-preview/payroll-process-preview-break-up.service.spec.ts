import { TestBed } from '@angular/core/testing';

import { PayrollProcessPreviewBreakUpService } from './payroll-process-preview-break-up.service';

describe('PayrollProcessPreviewBreakUpService', () => {
  let service: PayrollProcessPreviewBreakUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayrollProcessPreviewBreakUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
