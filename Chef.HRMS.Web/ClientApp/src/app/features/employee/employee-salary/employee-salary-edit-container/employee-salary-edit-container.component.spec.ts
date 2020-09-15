import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSalaryEditContainerComponent } from './employee-salary-edit-container.component';

describe('EmployeeSalaryEditContainerComponent', () => {
  let component: EmployeeSalaryEditContainerComponent;
  let fixture: ComponentFixture<EmployeeSalaryEditContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeSalaryEditContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSalaryEditContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
