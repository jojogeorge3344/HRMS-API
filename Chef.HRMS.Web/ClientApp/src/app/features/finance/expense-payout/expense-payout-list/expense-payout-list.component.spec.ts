import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensePayoutListComponent } from './expense-payout-list.component';

describe('ExpensePayoutListComponent', () => {
  let component: ExpensePayoutListComponent;
  let fixture: ComponentFixture<ExpensePayoutListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensePayoutListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensePayoutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
