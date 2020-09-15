import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollEmployeeLoanAdvancesListComponent } from './payroll-employee-loan-advances-list.component';

describe('PayrollEmployeeLoanAdvancesListComponent', () => {
  let component: PayrollEmployeeLoanAdvancesListComponent;
  let fixture: ComponentFixture<PayrollEmployeeLoanAdvancesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollEmployeeLoanAdvancesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollEmployeeLoanAdvancesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
