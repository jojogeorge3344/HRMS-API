import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSalaryCreateContainerComponent } from './employee-salary-create-container.component';

describe('EmployeeSalaryCreateComponent', () => {
  let component: EmployeeSalaryCreateContainerComponent;
  let fixture: ComponentFixture<EmployeeSalaryCreateContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeSalaryCreateContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSalaryCreateContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
