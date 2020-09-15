import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollLoanAdvanceListComponent } from './payroll-loan-advance-list.component';

describe('PayrollLoanAdvanceListComponent', () => {
  let component: PayrollLoanAdvanceListComponent;
  let fixture: ComponentFixture<PayrollLoanAdvanceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollLoanAdvanceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollLoanAdvanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
