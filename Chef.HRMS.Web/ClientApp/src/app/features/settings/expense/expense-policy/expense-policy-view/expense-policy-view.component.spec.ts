import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensePolicyViewComponent } from './expense-policy-view.component';

describe('ExpensePolicyViewComponent', () => {
  let component: ExpensePolicyViewComponent;
  let fixture: ComponentFixture<ExpensePolicyViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensePolicyViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensePolicyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
