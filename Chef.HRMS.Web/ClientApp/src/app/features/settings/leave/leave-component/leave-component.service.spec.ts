import { TestBed } from '@angular/core/testing';

import { LeaveComponentService } from './leave-component.service';

describe('LeaveComponentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeaveComponentService = TestBed.inject(LeaveComponentService);
    expect(service).toBeTruthy();
  });
});
