import { TestBed } from '@angular/core/testing';

import { EmployeeEducationalDetailsService } from './employee-educational-details.service';

describe('EmployeeEducationalDetailsService', () => {
  let service: EmployeeEducationalDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeEducationalDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
