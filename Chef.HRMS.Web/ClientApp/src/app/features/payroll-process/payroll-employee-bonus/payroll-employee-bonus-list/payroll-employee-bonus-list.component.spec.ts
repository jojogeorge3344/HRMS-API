import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollEmployeeBonusListComponent } from './payroll-employee-bonus-list.component';

describe('PayrollEmployeeBonusListComponent', () => {
  let component: PayrollEmployeeBonusListComponent;
  let fixture: ComponentFixture<PayrollEmployeeBonusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollEmployeeBonusListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollEmployeeBonusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
