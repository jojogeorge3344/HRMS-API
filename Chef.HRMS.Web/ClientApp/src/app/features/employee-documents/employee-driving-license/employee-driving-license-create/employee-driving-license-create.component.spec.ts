import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDrivingLicenseCreateComponent } from './employee-driving-license-create.component';

describe('EmployeeDrivingLicenseCreateComponent', () => {
  let component: EmployeeDrivingLicenseCreateComponent;
  let fixture: ComponentFixture<EmployeeDrivingLicenseCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDrivingLicenseCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDrivingLicenseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
