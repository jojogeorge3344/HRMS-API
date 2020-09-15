import { TestBed } from '@angular/core/testing';

import { EmployeePANCardDocumentService } from './employee-pan-card-document.service';

describe('EmployeePANCardDocumentService', () => {
  let service: EmployeePANCardDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeePANCardDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
