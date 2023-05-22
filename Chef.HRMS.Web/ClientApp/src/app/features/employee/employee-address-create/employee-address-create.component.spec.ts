import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAddressCreateComponent } from './employee-address-create.component';

describe('EmployeeAddressCreateComponent', () => {
  let component: EmployeeAddressCreateComponent;
  let fixture: ComponentFixture<EmployeeAddressCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAddressCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAddressCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
