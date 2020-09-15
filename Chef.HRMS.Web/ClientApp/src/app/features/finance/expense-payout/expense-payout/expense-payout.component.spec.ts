import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensePayoutComponent } from './expense-payout.component';

describe('ExpensePayoutComponent', () => {
  let component: ExpensePayoutComponent;
  let fixture: ComponentFixture<ExpensePayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensePayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensePayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
