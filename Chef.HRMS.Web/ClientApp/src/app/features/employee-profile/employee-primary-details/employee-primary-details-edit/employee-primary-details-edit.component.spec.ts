import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePrimaryDetailsEditComponent } from './employee-primary-details-edit.component';

describe('EmployeePrimaryDetailsEditComponent', () => {
  let component: EmployeePrimaryDetailsEditComponent;
  let fixture: ComponentFixture<EmployeePrimaryDetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeePrimaryDetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePrimaryDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
