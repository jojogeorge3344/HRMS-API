import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeJobDetailsEditComponent } from './employee-job-details-edit.component';

describe('EmployeeJobDetailsEditComponent', () => {
  let component: EmployeeJobDetailsEditComponent;
  let fixture: ComponentFixture<EmployeeJobDetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeJobDetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeJobDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
