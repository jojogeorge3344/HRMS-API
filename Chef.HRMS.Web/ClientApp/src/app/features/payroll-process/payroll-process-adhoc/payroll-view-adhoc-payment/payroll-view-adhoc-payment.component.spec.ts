import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollViewAdhocPaymentComponent } from './payroll-view-adhoc-payment.component';

describe('PayrollViewAdhocPaymentComponent', () => {
  let component: PayrollViewAdhocPaymentComponent;
  let fixture: ComponentFixture<PayrollViewAdhocPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollViewAdhocPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollViewAdhocPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
