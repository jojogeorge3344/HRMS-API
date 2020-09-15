import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDrivingLicenseViewComponent } from './employee-driving-license-view.component';

describe('EmployeeDrivingLicenseViewComponent', () => {
  let component: EmployeeDrivingLicenseViewComponent;
  let fixture: ComponentFixture<EmployeeDrivingLicenseViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDrivingLicenseViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDrivingLicenseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
