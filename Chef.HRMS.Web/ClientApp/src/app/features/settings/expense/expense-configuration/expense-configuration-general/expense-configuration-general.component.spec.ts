import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseConfigurationGeneralComponent } from './expense-configuration-general.component';

describe('ExpenseConfigurationGeneralComponent', () => {
  let component: ExpenseConfigurationGeneralComponent;
  let fixture: ComponentFixture<ExpenseConfigurationGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseConfigurationGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseConfigurationGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
