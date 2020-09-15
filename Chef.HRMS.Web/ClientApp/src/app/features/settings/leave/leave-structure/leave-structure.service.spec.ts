import { TestBed } from '@angular/core/testing';

import { LeaveStructureService } from './leave-structure.service';

describe('LeaveStructureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeaveStructureService = TestBed.inject(LeaveStructureService);
    expect(service).toBeTruthy();
  });
});
