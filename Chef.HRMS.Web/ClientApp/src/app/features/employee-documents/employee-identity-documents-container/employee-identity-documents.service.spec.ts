import { TestBed } from '@angular/core/testing';

import { EmployeeIdentityDocumentsService } from './employee-identity-documents.service';

describe('EmployeeIdentityDocumentsService', () => {
  let service: EmployeeIdentityDocumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeIdentityDocumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
