import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseRequestCreateComponent } from './expense-request-create.component';

describe('ExpenseRequestCreateComponent', () => {
  let component: ExpenseRequestCreateComponent;
  let fixture: ComponentFixture<ExpenseRequestCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseRequestCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseRequestCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
