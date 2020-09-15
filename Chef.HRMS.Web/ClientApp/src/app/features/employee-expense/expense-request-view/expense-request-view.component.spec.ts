import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseRequestViewComponent } from './expense-request-view.component';

describe('ExpenseRequestViewComponent', () => {
  let component: ExpenseRequestViewComponent;
  let fixture: ComponentFixture<ExpenseRequestViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseRequestViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseRequestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
