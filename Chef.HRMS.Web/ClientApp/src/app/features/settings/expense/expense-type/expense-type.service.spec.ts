import { TestBed } from '@angular/core/testing';

import { ExpenseTypeService } from './expense-type.service';

describe('ExpenseTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExpenseTypeService = TestBed.inject(ExpenseTypeService);
    expect(service).toBeTruthy();
  });
});
