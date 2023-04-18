import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollCalenderViewComponent } from './payroll-calender-view.component';

describe('PayrollCalenderViewComponent', () => {
  let component: PayrollCalenderViewComponent;
  let fixture: ComponentFixture<PayrollCalenderViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollCalenderViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollCalenderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
