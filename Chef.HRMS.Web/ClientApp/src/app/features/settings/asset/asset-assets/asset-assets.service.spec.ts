import { TestBed } from '@angular/core/testing';

import { AssetAssetsService } from './asset-assets.service';

describe('AssetAssetsService', () => {
  let service: AssetAssetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetAssetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
