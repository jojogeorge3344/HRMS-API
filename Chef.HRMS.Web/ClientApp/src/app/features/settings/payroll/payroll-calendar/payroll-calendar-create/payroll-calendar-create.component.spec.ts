import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollCalendarCreateComponent } from './payroll-calendar-create.component';

describe('PayrollCalendarCreateComponent', () => {
  let component: PayrollCalendarCreateComponent;
  let fixture: ComponentFixture<PayrollCalendarCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollCalendarCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollCalendarCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
