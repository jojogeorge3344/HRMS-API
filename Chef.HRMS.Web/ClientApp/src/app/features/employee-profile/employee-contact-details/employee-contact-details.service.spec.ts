import { TestBed } from '@angular/core/testing';

import { EmployeeContactDetailsService } from './employee-contact-details.service';

describe('EmployeeContactDetailsService', () => {
  let service: EmployeeContactDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeContactDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
