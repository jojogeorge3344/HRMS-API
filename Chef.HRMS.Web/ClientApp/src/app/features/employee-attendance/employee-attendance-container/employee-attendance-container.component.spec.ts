import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAttendanceContainerComponent } from './employee-attendance-container.component';

describe('EmployeeAttendanceContainerComponent', () => {
  let component: EmployeeAttendanceContainerComponent;
  let fixture: ComponentFixture<EmployeeAttendanceContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAttendanceContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAttendanceContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
