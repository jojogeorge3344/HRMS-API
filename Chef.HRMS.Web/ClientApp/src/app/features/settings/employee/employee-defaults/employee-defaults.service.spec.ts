import { TestBed } from '@angular/core/testing';

import { EmployeeDefaultsService } from './employee-defaults.service';

describe('EmployeeDefaultsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeDefaultsService = TestBed.inject(EmployeeDefaultsService);
    expect(service).toBeTruthy();
  });
});
