import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollEmployeeBonusContainerComponent } from './payroll-employee-bonus-container.component';

describe('PayrollEmployeeBonusContainerComponent', () => {
  let component: PayrollEmployeeBonusContainerComponent;
  let fixture: ComponentFixture<PayrollEmployeeBonusContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollEmployeeBonusContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollEmployeeBonusContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
