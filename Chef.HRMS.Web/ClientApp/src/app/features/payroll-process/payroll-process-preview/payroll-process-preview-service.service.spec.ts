import { TestBed } from '@angular/core/testing';

import { PayrollProcessPreviewServiceService } from './payroll-process-preview-service.service';

describe('PayrollProcessPreviewServiceService', () => {
  let service: PayrollProcessPreviewServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayrollProcessPreviewServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
