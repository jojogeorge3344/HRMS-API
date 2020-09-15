import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollEmployeeSalaryComponent } from './payroll-employee-salary.component';

describe('PayrollEmployeeSalaryComponent', () => {
  let component: PayrollEmployeeSalaryComponent;
  let fixture: ComponentFixture<PayrollEmployeeSalaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollEmployeeSalaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollEmployeeSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
