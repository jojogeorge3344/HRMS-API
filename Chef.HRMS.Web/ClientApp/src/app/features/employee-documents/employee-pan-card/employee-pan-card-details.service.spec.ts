import { TestBed } from '@angular/core/testing';

import { EmployeePANCardDetailsService } from './employee-pan-card-details.service';

describe('EmployeePANCardDetailsService', () => {
  let service: EmployeePANCardDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeePANCardDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
