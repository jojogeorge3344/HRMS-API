import { TestBed } from '@angular/core/testing';

import { EmployeeUIDDocumentService } from './employee-uid-document.service';

describe('EmployeeUIDDocumentService', () => {
  let service: EmployeeUIDDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeUIDDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
