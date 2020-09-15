import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollProcessSalaryListComponent } from './payroll-process-salary-list.component';

describe('PayrollProcessSalaryListComponent', () => {
  let component: PayrollProcessSalaryListComponent;
  let fixture: ComponentFixture<PayrollProcessSalaryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollProcessSalaryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollProcessSalaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
