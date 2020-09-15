import { TestBed } from '@angular/core/testing';

import { EmployeeOfficialDocumentsService } from './employee-official-documents.service';

describe('EmployeeOfficialDocumentsService', () => {
  let service: EmployeeOfficialDocumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeOfficialDocumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
