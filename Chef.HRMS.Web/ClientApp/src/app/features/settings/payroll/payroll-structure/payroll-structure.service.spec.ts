import { TestBed } from '@angular/core/testing';

import { PayrollStructureService } from './payroll-structure.service';

describe('PayrollStructureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PayrollStructureService = TestBed.inject(PayrollStructureService);
    expect(service).toBeTruthy();
  });
});
