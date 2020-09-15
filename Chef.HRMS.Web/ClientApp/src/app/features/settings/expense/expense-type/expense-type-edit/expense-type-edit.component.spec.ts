import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseTypeEditComponent } from './expense-type-edit.component';

describe('ExpenseTypeEditComponent', () => {
  let component: ExpenseTypeEditComponent;
  let fixture: ComponentFixture<ExpenseTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
