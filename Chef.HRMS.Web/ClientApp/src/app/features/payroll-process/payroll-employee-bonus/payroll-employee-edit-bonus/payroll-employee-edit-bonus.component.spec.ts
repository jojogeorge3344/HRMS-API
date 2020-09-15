import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollEmployeeEditBonusComponent } from './payroll-employee-edit-bonus.component';

describe('PayrollEmployeeEditBonusComponent', () => {
  let component: PayrollEmployeeEditBonusComponent;
  let fixture: ComponentFixture<PayrollEmployeeEditBonusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollEmployeeEditBonusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollEmployeeEditBonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
