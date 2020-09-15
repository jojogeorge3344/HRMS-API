import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRemoteLoginCreateComponent } from './employee-remote-login-create.component';

describe('EmployeeRemoteLoginCreateComponent', () => {
  let component: EmployeeRemoteLoginCreateComponent;
  let fixture: ComponentFixture<EmployeeRemoteLoginCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeRemoteLoginCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeRemoteLoginCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
