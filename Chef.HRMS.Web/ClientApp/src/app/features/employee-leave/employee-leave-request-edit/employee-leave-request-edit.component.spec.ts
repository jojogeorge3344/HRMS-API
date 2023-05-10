import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLeaveRequestEditComponent } from './employee-leave-request-edit.component';

describe('EmployeeLeaveRequestEditComponent', () => {
  let component: EmployeeLeaveRequestEditComponent;
  let fixture: ComponentFixture<EmployeeLeaveRequestEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeLeaveRequestEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeLeaveRequestEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
