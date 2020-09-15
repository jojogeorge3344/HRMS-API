import { TestBed } from '@angular/core/testing';

import { EmployeeUIDDetailsService } from './employee-uid-details.service';

describe('EmployeeUIDDetailsService', () => {
  let service: EmployeeUIDDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeUIDDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
