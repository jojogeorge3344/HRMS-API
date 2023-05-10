import { TestBed } from '@angular/core/testing';

import { EmployeeRevisionManagementService } from './employee-revision-management.service';

describe('EmployeeRevisionManagementService', () => {
  let service: EmployeeRevisionManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeRevisionManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
