import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAddressDetailsViewComponent } from './employee-address-details-view.component';

describe('EmployeeAddressDetailsViewComponent', () => {
  let component: EmployeeAddressDetailsViewComponent;
  let fixture: ComponentFixture<EmployeeAddressDetailsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAddressDetailsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAddressDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
