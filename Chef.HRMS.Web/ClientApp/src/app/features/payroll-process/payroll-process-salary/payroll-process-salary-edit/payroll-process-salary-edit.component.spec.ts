import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollProcessSalaryEditComponent } from './payroll-process-salary-edit.component';

describe('PayrollProcessSalaryEditComponent', () => {
  let component: PayrollProcessSalaryEditComponent;
  let fixture: ComponentFixture<PayrollProcessSalaryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollProcessSalaryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollProcessSalaryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
