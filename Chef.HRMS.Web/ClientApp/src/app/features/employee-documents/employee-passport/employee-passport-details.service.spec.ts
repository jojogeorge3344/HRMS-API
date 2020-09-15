import { TestBed } from '@angular/core/testing';

import { EmployeePassportDetailsService } from './employee-passport-details.service';

describe('EmployeePassportDetailsService', () => {
  let service: EmployeePassportDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeePassportDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
