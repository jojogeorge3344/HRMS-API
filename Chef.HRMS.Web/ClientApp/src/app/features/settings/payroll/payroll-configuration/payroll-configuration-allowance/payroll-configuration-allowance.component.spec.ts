import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollConfigurationAllowanceComponent } from './payroll-configuration-allowance.component';

describe('PayrollConfigurationAllowanceComponent', () => {
  let component: PayrollConfigurationAllowanceComponent;
  let fixture: ComponentFixture<PayrollConfigurationAllowanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollConfigurationAllowanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollConfigurationAllowanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
