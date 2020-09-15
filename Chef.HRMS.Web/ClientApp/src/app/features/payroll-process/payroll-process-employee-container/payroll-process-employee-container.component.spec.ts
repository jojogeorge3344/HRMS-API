import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollProcessEmployeeContainerComponent } from './payroll-process-employee-container.component';

describe('PayrollProcessEmployeeContainerComponent', () => {
  let component: PayrollProcessEmployeeContainerComponent;
  let fixture: ComponentFixture<PayrollProcessEmployeeContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollProcessEmployeeContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollProcessEmployeeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
