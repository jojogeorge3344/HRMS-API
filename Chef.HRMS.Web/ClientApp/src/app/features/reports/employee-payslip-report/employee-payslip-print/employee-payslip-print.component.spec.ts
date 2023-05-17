import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePayslipPrintComponent } from './employee-payslip-print.component';

describe('EmployeePayslipPrintComponent', () => {
  let component: EmployeePayslipPrintComponent;
  let fixture: ComponentFixture<EmployeePayslipPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeePayslipPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePayslipPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
