import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeJobTitleEditComponent } from './employee-job-title-edit.component';

describe('EmployeeJobTitleEditComponent', () => {
  let component: EmployeeJobTitleEditComponent;
  let fixture: ComponentFixture<EmployeeJobTitleEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeJobTitleEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeJobTitleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
