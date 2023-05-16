import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePayslipPrintFilterComponent } from './employee-payslip-print-filter.component';

describe('EmployeePayslipPrintFilterComponent', () => {
  let component: EmployeePayslipPrintFilterComponent;
  let fixture: ComponentFixture<EmployeePayslipPrintFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeePayslipPrintFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePayslipPrintFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
