import { TestBed } from '@angular/core/testing';

import { EmployeeNumbersService } from './employee-numbers.service';

describe('EmployeeNumbersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeNumbersService = TestBed.inject(EmployeeNumbersService);
    expect(service).toBeTruthy();
  });
});
