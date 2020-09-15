import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSalaryConfirmComponent } from './employee-salary-confirm.component';

describe('EmployeeSalaryConfirmComponent', () => {
  let component: EmployeeSalaryConfirmComponent;
  let fixture: ComponentFixture<EmployeeSalaryConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeSalaryConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSalaryConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
