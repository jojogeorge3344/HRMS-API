import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollProcessLoanEditComponent } from './payroll-process-loan-edit.component';

describe('PayrollProcessLoanEditComponent', () => {
  let component: PayrollProcessLoanEditComponent;
  let fixture: ComponentFixture<PayrollProcessLoanEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollProcessLoanEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollProcessLoanEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
