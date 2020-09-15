import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAddressDetailsEditComponent } from './employee-address-details-edit.component';

describe('EmployeeAddressDetailsEditComponent', () => {
  let component: EmployeeAddressDetailsEditComponent;
  let fixture: ComponentFixture<EmployeeAddressDetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAddressDetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAddressDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
