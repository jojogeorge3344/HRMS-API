import { TestBed } from '@angular/core/testing';

import { EmployeeBasicDetailsService } from './employee-basic-details.service';

describe('EmployeeBasicDetailsService', () => {
  let service: EmployeeBasicDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeBasicDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
