import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollConfigurationStandardDeductionComponent } from './payroll-configuration-standard-deduction.component';

describe('PayrollConfigurationStandardDeductionComponent', () => {
  let component: PayrollConfigurationStandardDeductionComponent;
  let fixture: ComponentFixture<PayrollConfigurationStandardDeductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollConfigurationStandardDeductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollConfigurationStandardDeductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
