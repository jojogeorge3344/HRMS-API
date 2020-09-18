import { TestBed } from '@angular/core/testing';

import { EmployeeAttendanceBulkUploadService } from './employee-attendance-bulk-upload.service';

describe('EmployeeAttendanceBulkUploadService', () => {
  let service: EmployeeAttendanceBulkUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeAttendanceBulkUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
