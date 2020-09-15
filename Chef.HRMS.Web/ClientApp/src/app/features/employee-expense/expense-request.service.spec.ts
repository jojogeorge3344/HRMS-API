import { TestBed } from '@angular/core/testing';

import { ExpenseRequestService } from './expense-request.service';

describe('ExpenseRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExpenseRequestService = TestBed.inject(ExpenseRequestService);
    expect(service).toBeTruthy();
  });
});
