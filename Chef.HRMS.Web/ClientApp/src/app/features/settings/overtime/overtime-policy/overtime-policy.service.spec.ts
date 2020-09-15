import { TestBed } from '@angular/core/testing';

import { OvertimePolicyService } from './overtime-policy.service';

describe('OvertimePolicyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OvertimePolicyService = TestBed.inject(OvertimePolicyService);
    expect(service).toBeTruthy();
  });
});
