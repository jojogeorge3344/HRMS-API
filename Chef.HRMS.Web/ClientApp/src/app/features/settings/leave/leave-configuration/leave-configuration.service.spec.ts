import { TestBed } from '@angular/core/testing';

import { LeaveConfigurationService } from './leave-configuration.service';

describe('LeaveConfigurationService', () => {
  let service: LeaveConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaveConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
