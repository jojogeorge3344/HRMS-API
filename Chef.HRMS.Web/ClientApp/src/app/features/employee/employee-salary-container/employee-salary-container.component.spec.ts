import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSalaryContainerComponent } from './employee-salary-container.component';

describe('EmployeeSalaryContainerComponent', () => {
  let component: EmployeeSalaryContainerComponent;
  let fixture: ComponentFixture<EmployeeSalaryContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeSalaryContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSalaryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
