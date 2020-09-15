import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollProcessLoansAdvancesListComponent } from './payroll-process-loans-advances-list.component';

describe('PayrollProcessLoansAdvancesListComponent', () => {
  let component: PayrollProcessLoansAdvancesListComponent;
  let fixture: ComponentFixture<PayrollProcessLoansAdvancesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollProcessLoansAdvancesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollProcessLoansAdvancesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
