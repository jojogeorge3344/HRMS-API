import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLeaveRequestCreateComponent } from './employee-leave-request-create.component';

describe('EmployeeLeaveRequestCreateComponent', () => {
  let component: EmployeeLeaveRequestCreateComponent;
  let fixture: ComponentFixture<EmployeeLeaveRequestCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeLeaveRequestCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeLeaveRequestCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
