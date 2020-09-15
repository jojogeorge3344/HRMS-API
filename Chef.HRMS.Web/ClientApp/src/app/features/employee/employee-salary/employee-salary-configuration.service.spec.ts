import { TestBed } from '@angular/core/testing';

import { EmployeeSalaryConfigurationService } from './employee-salary-configuration.service';

describe('EmployeeSalaryConfigurationService', () => {
  let service: EmployeeSalaryConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeSalaryConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
