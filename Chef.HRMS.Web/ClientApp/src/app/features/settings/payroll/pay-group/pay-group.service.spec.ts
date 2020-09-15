import { TestBed } from '@angular/core/testing';

import { PayGroupService } from './pay-group.service';

describe('PayGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PayGroupService = TestBed.inject(PayGroupService);
    expect(service).toBeTruthy();
  });
});
