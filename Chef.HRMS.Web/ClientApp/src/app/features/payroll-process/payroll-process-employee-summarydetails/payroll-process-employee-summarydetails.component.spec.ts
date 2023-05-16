import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollProcessEmployeeSummarydetailsComponent } from './payroll-process-employee-summarydetails.component';

describe('PayrollProcessEmployeeSummarydetailsComponent', () => {
  let component: PayrollProcessEmployeeSummarydetailsComponent;
  let fixture: ComponentFixture<PayrollProcessEmployeeSummarydetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollProcessEmployeeSummarydetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollProcessEmployeeSummarydetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
