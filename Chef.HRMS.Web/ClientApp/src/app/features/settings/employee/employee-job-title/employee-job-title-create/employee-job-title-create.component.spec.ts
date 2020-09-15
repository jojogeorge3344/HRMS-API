import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeJobTitleCreateComponent } from './employee-job-title-create.component';

describe('EmployeeJobTitleCreateComponent', () => {
  let component: EmployeeJobTitleCreateComponent;
  let fixture: ComponentFixture<EmployeeJobTitleCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeJobTitleCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeJobTitleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
