import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseConfigurationMileageComponent } from './expense-configuration-mileage.component';

describe('ExpenseConfigurationMileageComponent', () => {
  let component: ExpenseConfigurationMileageComponent;
  let fixture: ComponentFixture<ExpenseConfigurationMileageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseConfigurationMileageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseConfigurationMileageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
