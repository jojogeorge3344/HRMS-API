import { TestBed } from '@angular/core/testing';

import { LeaveConfigurationRestrictionsService } from './leave-configuration-restrictions.service';

describe('LeaveConfigurationRestrictionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeaveConfigurationRestrictionsService = TestBed.inject(LeaveConfigurationRestrictionsService);
    expect(service).toBeTruthy();
  });
});
