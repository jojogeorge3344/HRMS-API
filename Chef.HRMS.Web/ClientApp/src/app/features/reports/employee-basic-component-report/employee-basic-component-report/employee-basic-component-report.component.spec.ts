import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBasicComponentReportComponent } from './employee-basic-component-report.component';

describe('EmployeeBasicComponentReportComponent', () => {
  let component: EmployeeBasicComponentReportComponent;
  let fixture: ComponentFixture<EmployeeBasicComponentReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeBasicComponentReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeBasicComponentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
