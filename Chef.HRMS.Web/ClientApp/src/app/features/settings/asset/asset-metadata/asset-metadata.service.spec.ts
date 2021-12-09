import { TestBed } from '@angular/core/testing';

import { AssetMetadataService } from './asset-metadata.service';

describe('AssetMetadataService', () => {
  let service: AssetMetadataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetMetadataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
