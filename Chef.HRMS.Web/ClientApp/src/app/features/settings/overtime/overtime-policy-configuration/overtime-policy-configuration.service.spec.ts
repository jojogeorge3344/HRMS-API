import { TestBed } from '@angular/core/testing';

import { OvertimePolicyConfigurationService } from './overtime-policy-configuration.service';

describe('OvertimePolicyConfigurationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OvertimePolicyConfigurationService = TestBed.inject(OvertimePolicyConfigurationService);
    expect(service).toBeTruthy();
  });
});
