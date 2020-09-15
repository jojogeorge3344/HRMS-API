import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessedSalaryReportComponent } from './processed-salary-report.component';

describe('ProcessedSalaryReportComponent', () => {
  let component: ProcessedSalaryReportComponent;
  let fixture: ComponentFixture<ProcessedSalaryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessedSalaryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessedSalaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
