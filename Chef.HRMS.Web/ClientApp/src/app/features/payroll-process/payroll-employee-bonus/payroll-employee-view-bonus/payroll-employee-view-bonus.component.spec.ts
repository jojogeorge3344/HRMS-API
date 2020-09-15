import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollEmployeeViewBonusComponent } from './payroll-employee-view-bonus.component';

describe('PayrollEmployeeViewBonusComponent', () => {
  let component: PayrollEmployeeViewBonusComponent;
  let fixture: ComponentFixture<PayrollEmployeeViewBonusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollEmployeeViewBonusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollEmployeeViewBonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
