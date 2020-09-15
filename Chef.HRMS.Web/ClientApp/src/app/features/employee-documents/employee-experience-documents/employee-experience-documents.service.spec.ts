import { TestBed } from '@angular/core/testing';

import { EmployeeExperienceDocumentsService } from './employee-experience-documents.service';

describe('EmployeeExperienceDocumentsService', () => {
  let service: EmployeeExperienceDocumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeExperienceDocumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
