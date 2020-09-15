import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseConfigurationCashAdvanceComponent } from './expense-configuration-cash-advance.component';

describe('ExpenseConfigurationCashAdvanceComponent', () => {
  let component: ExpenseConfigurationCashAdvanceComponent;
  let fixture: ComponentFixture<ExpenseConfigurationCashAdvanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseConfigurationCashAdvanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseConfigurationCashAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
