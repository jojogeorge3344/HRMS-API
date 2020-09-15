import { TestBed } from '@angular/core/testing';

import { HolidayCategoryService } from './holiday-category.service';

describe('HolidayCategoryService', () => {
  let service: HolidayCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HolidayCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
