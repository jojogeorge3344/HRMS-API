import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensePolicyCreateComponent } from './expense-policy-create.component';

describe('ExpensePolicyCreateComponent', () => {
  let component: ExpensePolicyCreateComponent;
  let fixture: ComponentFixture<ExpensePolicyCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensePolicyCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensePolicyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
