/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DateformaterService } from './dateformater.service';

describe('Service: Dateformater', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateformaterService]
    });
  });

  it('should ...', inject([DateformaterService], (service: DateformaterService) => {
    expect(service).toBeTruthy();
  }));
});
