import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensePayoutViewComponent } from './expense-payout-view.component';

describe('ExpensePayoutViewComponent', () => {
  let component: ExpensePayoutViewComponent;
  let fixture: ComponentFixture<ExpensePayoutViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensePayoutViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensePayoutViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
