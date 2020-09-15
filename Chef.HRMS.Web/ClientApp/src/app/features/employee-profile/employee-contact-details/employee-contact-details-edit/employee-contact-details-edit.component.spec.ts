import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeContactDetailsEditComponent } from './employee-contact-details-edit.component';

describe('EmployeeContactDetailsEditComponent', () => {
  let component: EmployeeContactDetailsEditComponent;
  let fixture: ComponentFixture<EmployeeContactDetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeContactDetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeContactDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
