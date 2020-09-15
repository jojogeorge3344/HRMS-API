import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDrivingLicenseEditComponent } from './employee-driving-license-edit.component';

describe('EmployeeDrivingLicenseEditComponent', () => {
  let component: EmployeeDrivingLicenseEditComponent;
  let fixture: ComponentFixture<EmployeeDrivingLicenseEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDrivingLicenseEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDrivingLicenseEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
