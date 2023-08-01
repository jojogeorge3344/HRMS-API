import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollProcessSalarydetailsViewComponent } from './payroll-process-salarydetails-view.component';

describe('PayrollProcessSalarydetailsViewComponent', () => {
  let component: PayrollProcessSalarydetailsViewComponent;
  let fixture: ComponentFixture<PayrollProcessSalarydetailsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollProcessSalarydetailsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollProcessSalarydetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
