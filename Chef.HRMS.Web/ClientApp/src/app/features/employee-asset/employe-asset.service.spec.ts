import { TestBed } from '@angular/core/testing';

import { EmployeAssetService } from './employe-asset.service';

describe('EmployeAssetService', () => {
  let service: EmployeAssetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeAssetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
