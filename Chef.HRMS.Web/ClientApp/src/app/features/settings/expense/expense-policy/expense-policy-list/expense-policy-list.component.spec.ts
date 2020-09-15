import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensePolicyListComponent } from './expense-policy-list.component';

describe('ExpensePolicyListComponent', () => {
  let component: ExpensePolicyListComponent;
  let fixture: ComponentFixture<ExpensePolicyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensePolicyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensePolicyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
