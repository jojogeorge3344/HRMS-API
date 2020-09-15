import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLeaveRequestListComponent } from './employee-leave-request-list.component';

describe('EmployeeLeaveRequestListComponent', () => {
  let component: EmployeeLeaveRequestListComponent;
  let fixture: ComponentFixture<EmployeeLeaveRequestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeLeaveRequestListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeLeaveRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
