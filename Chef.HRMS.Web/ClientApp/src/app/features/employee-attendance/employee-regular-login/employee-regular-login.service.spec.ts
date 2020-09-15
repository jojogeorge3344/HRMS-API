import { TestBed } from '@angular/core/testing';

import { EmployeeRegularLoginService } from './employee-regular-login.service';

describe('EmployeeRegularLoginService', () => {
  let service: EmployeeRegularLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeRegularLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
