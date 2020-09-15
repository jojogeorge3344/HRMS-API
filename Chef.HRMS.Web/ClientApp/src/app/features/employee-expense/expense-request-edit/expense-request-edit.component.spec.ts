import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseRequestEditComponent } from './expense-request-edit.component';

describe('ExpenseRequestEditComponent', () => {
  let component: ExpenseRequestEditComponent;
  let fixture: ComponentFixture<ExpenseRequestEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseRequestEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseRequestEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
