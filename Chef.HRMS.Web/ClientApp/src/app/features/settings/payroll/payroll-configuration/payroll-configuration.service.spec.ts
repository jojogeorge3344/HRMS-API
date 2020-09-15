import { TestBed } from '@angular/core/testing';

import { PayrollConfigurationService } from './payroll-configuration.service';

describe('PayrollConfigurationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PayrollConfigurationService = TestBed.inject(PayrollConfigurationService);
    expect(service).toBeTruthy();
  });
});
