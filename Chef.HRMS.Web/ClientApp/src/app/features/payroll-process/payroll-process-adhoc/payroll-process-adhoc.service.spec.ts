import { TestBed } from '@angular/core/testing';

import { PayrollProcessAdhocService } from './payroll-process-adhoc.service';

describe('PayrollProcessAdhocService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PayrollProcessAdhocService = TestBed.get(PayrollProcessAdhocService);
    expect(service).toBeTruthy();
  });
});
