import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseTypeViewComponent } from './expense-type-view.component';

describe('ExpenseTypeViewComponent', () => {
  let component: ExpenseTypeViewComponent;
  let fixture: ComponentFixture<ExpenseTypeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseTypeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseTypeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
