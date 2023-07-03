import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeOvertimeReportPrintComponent } from './employee-overtime-report-print.component';

describe('EmployeeOvertimeReportPrintComponent', () => {
  let component: EmployeeOvertimeReportPrintComponent;
  let fixture: ComponentFixture<EmployeeOvertimeReportPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeOvertimeReportPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeOvertimeReportPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
