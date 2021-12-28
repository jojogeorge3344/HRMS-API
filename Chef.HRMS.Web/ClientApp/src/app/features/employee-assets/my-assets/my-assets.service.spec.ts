import { TestBed } from '@angular/core/testing';

import { MyAssetsService } from './my-assets.service';

describe('MyAssetsService', () => {
  let service: MyAssetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyAssetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
