import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollEmployeeLeaveComponent } from './payroll-employee-leave.component';

describe('PayrollEmployeeLeaveComponent', () => {
  let component: PayrollEmployeeLeaveComponent;
  let fixture: ComponentFixture<PayrollEmployeeLeaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollEmployeeLeaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollEmployeeLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
