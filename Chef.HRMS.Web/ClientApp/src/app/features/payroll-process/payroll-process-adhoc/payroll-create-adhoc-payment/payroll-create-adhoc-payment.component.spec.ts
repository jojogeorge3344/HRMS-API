import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollCreateAdhocPaymentComponent } from './payroll-create-adhoc-payment.component';

describe('PayrollCreateAdhocPaymentComponent', () => {
  let component: PayrollCreateAdhocPaymentComponent;
  let fixture: ComponentFixture<PayrollCreateAdhocPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollCreateAdhocPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollCreateAdhocPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
