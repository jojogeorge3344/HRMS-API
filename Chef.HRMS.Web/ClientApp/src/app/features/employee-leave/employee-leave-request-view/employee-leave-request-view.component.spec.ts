import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLeaveRequestViewComponent } from './employee-leave-request-view.component';

describe('EmployeeLeaveRequestViewComponent', () => {
  let component: EmployeeLeaveRequestViewComponent;
  let fixture: ComponentFixture<EmployeeLeaveRequestViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeLeaveRequestViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeLeaveRequestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
