import { TestBed } from '@angular/core/testing';

import { EmployeeDrivingLicenseDocumentService } from './employee-driving-license-document.service';

describe('EmployeeDrivingLicenseDocumentService', () => {
  let service: EmployeeDrivingLicenseDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeDrivingLicenseDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
