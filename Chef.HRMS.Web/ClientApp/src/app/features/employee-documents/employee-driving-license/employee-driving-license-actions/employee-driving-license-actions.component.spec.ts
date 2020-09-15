import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDrivingLicenseActionsComponent } from './employee-driving-license-actions.component';

describe('EmployeeDrivingLicenseActionsComponent', () => {
  let component: EmployeeDrivingLicenseActionsComponent;
  let fixture: ComponentFixture<EmployeeDrivingLicenseActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDrivingLicenseActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDrivingLicenseActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
