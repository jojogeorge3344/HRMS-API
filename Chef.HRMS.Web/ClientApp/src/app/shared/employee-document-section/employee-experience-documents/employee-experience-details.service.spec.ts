import { TestBed } from '@angular/core/testing';

import { EmployeeExperienceDetailsService } from './employee-experience-details.service';

describe('EmployeeExperienceDetailsService', () => {
  let service: EmployeeExperienceDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeExperienceDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
