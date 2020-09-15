import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollCalendarEditComponent } from './payroll-calendar-edit.component';

describe('PayrollCalendarEditComponent', () => {
  let component: PayrollCalendarEditComponent;
  let fixture: ComponentFixture<PayrollCalendarEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollCalendarEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollCalendarEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
