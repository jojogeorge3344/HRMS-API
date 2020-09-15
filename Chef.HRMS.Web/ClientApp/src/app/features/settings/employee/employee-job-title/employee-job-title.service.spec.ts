import { TestBed } from '@angular/core/testing';

import { EmployeeJobTitleService } from './employee-job-title.service';

describe('EmployeeJobTitleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeJobTitleService = TestBed.inject(EmployeeJobTitleService);
    expect(service).toBeTruthy();
  });
});
