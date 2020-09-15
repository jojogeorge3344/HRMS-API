import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBankDetailsCreateComponent } from './employee-bank-details-create.component';

describe('EmployeeBankDetailsCreateComponent', () => {
  let component: EmployeeBankDetailsCreateComponent;
  let fixture: ComponentFixture<EmployeeBankDetailsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeBankDetailsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeBankDetailsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
