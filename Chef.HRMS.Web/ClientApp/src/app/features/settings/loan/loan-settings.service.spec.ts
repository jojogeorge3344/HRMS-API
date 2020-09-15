import { TestBed } from '@angular/core/testing';

import { LoanSettingsService } from './loan-settings.service';

describe('LoanSettingsService', () => {
  let service: LoanSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
