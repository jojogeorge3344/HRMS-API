import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSalaryViewContainerComponent } from './employee-salary-view-container.component';

describe('EmployeeSalaryViewContainerComponent', () => {
  let component: EmployeeSalaryViewContainerComponent;
  let fixture: ComponentFixture<EmployeeSalaryViewContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeSalaryViewContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSalaryViewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
