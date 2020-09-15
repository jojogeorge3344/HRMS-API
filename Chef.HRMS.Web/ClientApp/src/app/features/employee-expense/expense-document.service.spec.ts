import { TestBed } from '@angular/core/testing';

import { ExpenseDocumentService } from './expense-document.service';

describe('ExpensedocumentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExpenseDocumentService = TestBed.inject(ExpenseDocumentService);
    expect(service).toBeTruthy();
  });
});
