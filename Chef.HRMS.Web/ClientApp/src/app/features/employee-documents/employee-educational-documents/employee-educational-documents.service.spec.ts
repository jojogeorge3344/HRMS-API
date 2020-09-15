import { TestBed } from '@angular/core/testing';

import { EmployeeEducationalDocumentsService } from './employee-educational-documents.service';

describe('EmployeeEducationalDocumentsService', () => {
  let service: EmployeeEducationalDocumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeEducationalDocumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
