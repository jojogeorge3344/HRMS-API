import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseConfigurationEditComponent } from './expense-configuration-edit.component';

describe('ExpenseConfigurationEditComponent', () => {
  let component: ExpenseConfigurationEditComponent;
  let fixture: ComponentFixture<ExpenseConfigurationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseConfigurationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseConfigurationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
