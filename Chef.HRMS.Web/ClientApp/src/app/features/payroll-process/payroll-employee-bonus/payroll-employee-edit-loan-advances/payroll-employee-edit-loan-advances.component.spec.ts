import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollEmployeeEditLoanAdvancesComponent } from './payroll-employee-edit-loan-advances.component';

describe('PayrollEmployeeEditLoanAdvancesComponent', () => {
  let component: PayrollEmployeeEditLoanAdvancesComponent;
  let fixture: ComponentFixture<PayrollEmployeeEditLoanAdvancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollEmployeeEditLoanAdvancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollEmployeeEditLoanAdvancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
