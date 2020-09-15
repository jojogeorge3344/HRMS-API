import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensePolicyEditComponent } from './expense-policy-edit.component';

describe('ExpensePolicyEditComponent', () => {
  let component: ExpensePolicyEditComponent;
  let fixture: ComponentFixture<ExpensePolicyEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensePolicyEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensePolicyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
