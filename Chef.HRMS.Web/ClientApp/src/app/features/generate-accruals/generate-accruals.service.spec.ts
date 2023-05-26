import { TestBed } from '@angular/core/testing';

import { GenerateAccrualsService } from './generate-accruals.service';

describe('GenerateAccrualsService', () => {
  let service: GenerateAccrualsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateAccrualsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
