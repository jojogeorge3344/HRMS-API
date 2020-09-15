import { TestBed } from '@angular/core/testing';

import { LeaveConfigurationGeneralService } from './leave-configuration-general.service';

describe('LeaveConfigurationGeneralService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeaveConfigurationGeneralService = TestBed.inject(LeaveConfigurationGeneralService);
    expect(service).toBeTruthy();
  });
});
