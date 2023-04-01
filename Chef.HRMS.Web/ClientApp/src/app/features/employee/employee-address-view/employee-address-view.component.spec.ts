import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAddressViewComponent } from './employee-address-view.component';

describe('EmployeeAddressViewComponent', () => {
  let component: EmployeeAddressViewComponent;
  let fixture: ComponentFixture<EmployeeAddressViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAddressViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAddressViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
