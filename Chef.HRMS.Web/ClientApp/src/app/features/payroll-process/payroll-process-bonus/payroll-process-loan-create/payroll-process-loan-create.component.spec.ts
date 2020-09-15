import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollProcessLoanCreateComponent } from './payroll-process-loan-create.component';

describe('PayrollProcessLoanCreateComponent', () => {
  let component: PayrollProcessLoanCreateComponent;
  let fixture: ComponentFixture<PayrollProcessLoanCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollProcessLoanCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollProcessLoanCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
