import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseRequestListComponent } from './expense-request-list.component';

describe('ExpenseRequestListComponent', () => {
  let component: ExpenseRequestListComponent;
  let fixture: ComponentFixture<ExpenseRequestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseRequestListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
