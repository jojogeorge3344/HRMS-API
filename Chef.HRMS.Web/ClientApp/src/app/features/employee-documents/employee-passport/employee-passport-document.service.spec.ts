import { TestBed } from '@angular/core/testing';

import { EmployeePassportDocumentService } from './employee-passport-document.service';

describe('EmployeePassportDocumentService', () => {
  let service: EmployeePassportDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeePassportDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
