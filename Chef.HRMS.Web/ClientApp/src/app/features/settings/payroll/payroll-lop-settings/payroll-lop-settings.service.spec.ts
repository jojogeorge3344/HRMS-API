import { TestBed } from '@angular/core/testing';

import { PayrollLopSettingsService } from './payroll-lop-settings.service';

describe('PayrollLopSettingsService', () => {
  let service: PayrollLopSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayrollLopSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
