import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollEditAdhocPaymentComponent } from './payroll-edit-adhoc-payment.component';

describe('PayrollEditAdhocPaymentComponent', () => {
  let component: PayrollEditAdhocPaymentComponent;
  let fixture: ComponentFixture<PayrollEditAdhocPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollEditAdhocPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollEditAdhocPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
