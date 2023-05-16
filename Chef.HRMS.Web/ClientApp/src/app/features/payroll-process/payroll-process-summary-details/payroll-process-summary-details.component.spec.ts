import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollProcessSummaryDetailsComponent } from './payroll-process-summary-details.component';

describe('PayrollProcessSummaryDetailsComponent', () => {
  let component: PayrollProcessSummaryDetailsComponent;
  let fixture: ComponentFixture<PayrollProcessSummaryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollProcessSummaryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollProcessSummaryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
