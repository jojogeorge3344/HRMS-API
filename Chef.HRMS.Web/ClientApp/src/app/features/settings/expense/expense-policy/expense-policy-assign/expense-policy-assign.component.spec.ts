import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensePolicyAssignComponent } from './expense-policy-assign.component';

describe('ExpensePolicyAssignComponent', () => {
  let component: ExpensePolicyAssignComponent;
  let fixture: ComponentFixture<ExpensePolicyAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensePolicyAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensePolicyAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
