import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAddressEditComponent } from './employee-address-edit.component';

describe('EmployeeAddressEditComponent', () => {
  let component: EmployeeAddressEditComponent;
  let fixture: ComponentFixture<EmployeeAddressEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAddressEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAddressEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
