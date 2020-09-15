import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollEmployeeViewLoanAdvancesComponent } from './payroll-employee-view-loan-advances.component';

describe('PayrollEmployeeViewLoanAdvancesComponent', () => {
  let component: PayrollEmployeeViewLoanAdvancesComponent;
  let fixture: ComponentFixture<PayrollEmployeeViewLoanAdvancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollEmployeeViewLoanAdvancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollEmployeeViewLoanAdvancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
