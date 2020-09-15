import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAttendanceActionsComponent } from './employee-attendance-actions.component';

describe('EmployeeAttendanceActionsComponent', () => {
  let component: EmployeeAttendanceActionsComponent;
  let fixture: ComponentFixture<EmployeeAttendanceActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAttendanceActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAttendanceActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
