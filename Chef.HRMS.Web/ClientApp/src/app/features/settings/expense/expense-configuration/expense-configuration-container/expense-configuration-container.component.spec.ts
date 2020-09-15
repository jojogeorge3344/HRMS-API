import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseConfigurationContainerComponent } from './expense-configuration-container.component';

describe('ExpenseConfigurationContainerComponent', () => {
  let component: ExpenseConfigurationContainerComponent;
  let fixture: ComponentFixture<ExpenseConfigurationContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseConfigurationContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseConfigurationContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
