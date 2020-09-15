import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSalaryFormComponent } from './employee-salary-form.component';

describe('EmployeeSalaryFormComponent', () => {
  let component: EmployeeSalaryFormComponent;
  let fixture: ComponentFixture<EmployeeSalaryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeSalaryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSalaryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
