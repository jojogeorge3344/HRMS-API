import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeOvertimeReportComponent } from './employee-overtime-report.component';

describe('EmployeeOvertimeReportComponent', () => {
  let component: EmployeeOvertimeReportComponent;
  let fixture: ComponentFixture<EmployeeOvertimeReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeOvertimeReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeOvertimeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
