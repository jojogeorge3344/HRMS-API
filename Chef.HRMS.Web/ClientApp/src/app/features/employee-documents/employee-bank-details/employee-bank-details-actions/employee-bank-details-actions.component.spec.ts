import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBankDetailsActionsComponent } from './employee-bank-details-actions.component';

describe('EmployeeBankDetailsActionsComponent', () => {
  let component: EmployeeBankDetailsActionsComponent;
  let fixture: ComponentFixture<EmployeeBankDetailsActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeBankDetailsActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeBankDetailsActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
