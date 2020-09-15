import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseTypeCreateComponent } from './expense-type-create.component';

describe('ExpenseTypeCreateComponent', () => {
  let component: ExpenseTypeCreateComponent;
  let fixture: ComponentFixture<ExpenseTypeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseTypeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
