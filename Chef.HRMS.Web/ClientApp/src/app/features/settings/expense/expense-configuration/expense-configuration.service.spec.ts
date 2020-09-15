import { TestBed } from '@angular/core/testing';

import { ExpenseConfigurationService } from './expense-configuration.service';

describe('ExpenseConfigurationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExpenseConfigurationService = TestBed.inject(ExpenseConfigurationService);
    expect(service).toBeTruthy();
  });
});
