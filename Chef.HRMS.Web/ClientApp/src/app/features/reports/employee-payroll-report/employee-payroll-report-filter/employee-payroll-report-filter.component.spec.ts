import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePayrollReportFilterComponent } from './employee-payroll-report-filter.component';

describe('EmployeePayrollReportFilterComponent', () => {
  let component: EmployeePayrollReportFilterComponent;
  let fixture: ComponentFixture<EmployeePayrollReportFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeePayrollReportFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePayrollReportFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
