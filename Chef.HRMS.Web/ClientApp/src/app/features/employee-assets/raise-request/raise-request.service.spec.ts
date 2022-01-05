import { TestBed } from '@angular/core/testing';

import { RaiseRequestService } from './raise-request.service';

describe('RaiseRequestService', () => {
  let service: RaiseRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RaiseRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
