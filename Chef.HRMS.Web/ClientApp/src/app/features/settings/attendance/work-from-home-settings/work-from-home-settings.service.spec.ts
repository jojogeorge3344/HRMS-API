import { TestBed } from '@angular/core/testing';

import { WorkFromHomeSettingsService } from './work-from-home-settings.service';

describe('WorkFromHomeSettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkFromHomeSettingsService = TestBed.inject(WorkFromHomeSettingsService);
    expect(service).toBeTruthy();
  });
});
