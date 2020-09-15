import { TestBed } from '@angular/core/testing';

import { ExpensePayoutService } from './expense-payout.service';

describe('ExpensePayoutService', () => {
  let service: ExpensePayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpensePayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
