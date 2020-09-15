import { TestBed } from '@angular/core/testing';

import { PayrollLopService } from './payroll-lop.service';

describe('PayrollLopService', () => {
  let service: PayrollLopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayrollLopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
