import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollEmployeeCreateLoanAdvancesComponent } from './payroll-employee-create-loan-advances.component';

describe('PayrollEmployeeCreateLoanAdvancesComponent', () => {
  let component: PayrollEmployeeCreateLoanAdvancesComponent;
  let fixture: ComponentFixture<PayrollEmployeeCreateLoanAdvancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollEmployeeCreateLoanAdvancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollEmployeeCreateLoanAdvancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
