import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollProcessLoanViewComponent } from './payroll-process-loan-view.component';

describe('PayrollProcessLoanViewComponent', () => {
  let component: PayrollProcessLoanViewComponent;
  let fixture: ComponentFixture<PayrollProcessLoanViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollProcessLoanViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollProcessLoanViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
