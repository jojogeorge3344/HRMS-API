import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListReportComponent } from './employee-list-report.component';

describe('EmployeeListReportComponent', () => {
  let component: EmployeeListReportComponent;
  let fixture: ComponentFixture<EmployeeListReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeListReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
