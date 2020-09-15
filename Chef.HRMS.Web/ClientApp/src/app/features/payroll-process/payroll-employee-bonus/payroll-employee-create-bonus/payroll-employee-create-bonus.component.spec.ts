import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollEmployeeCreateBonusComponent } from './payroll-employee-create-bonus.component';

describe('PayrollEmployeeCreateBonusComponent', () => {
  let component: PayrollEmployeeCreateBonusComponent;
  let fixture: ComponentFixture<PayrollEmployeeCreateBonusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollEmployeeCreateBonusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollEmployeeCreateBonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
