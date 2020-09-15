import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBankDetailsEditComponent } from './employee-bank-details-edit.component';

describe('EmployeeBankDetailsEditComponent', () => {
  let component: EmployeeBankDetailsEditComponent;
  let fixture: ComponentFixture<EmployeeBankDetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeBankDetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeBankDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
