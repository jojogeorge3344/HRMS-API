import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollDeferPayementComponent } from './payroll-defer-payement.component';

describe('PayrollDeferPayementComponent', () => {
  let component: PayrollDeferPayementComponent;
  let fixture: ComponentFixture<PayrollDeferPayementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollDeferPayementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollDeferPayementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
