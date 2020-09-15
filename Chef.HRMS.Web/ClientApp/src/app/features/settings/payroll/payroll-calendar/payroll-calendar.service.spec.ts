import { TestBed } from '@angular/core/testing';

import { PayrollCalendarService } from './payroll-calendar.service';

describe('PayrollCalendarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PayrollCalendarService = TestBed.inject(PayrollCalendarService);
    expect(service).toBeTruthy();
  });
});
