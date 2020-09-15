import { TestBed } from '@angular/core/testing';

import { ExpensePolicyService } from './expense-policy.service';

describe('ExpensePolicyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExpensePolicyService = TestBed.inject(ExpensePolicyService);
    expect(service).toBeTruthy();
  });
});
