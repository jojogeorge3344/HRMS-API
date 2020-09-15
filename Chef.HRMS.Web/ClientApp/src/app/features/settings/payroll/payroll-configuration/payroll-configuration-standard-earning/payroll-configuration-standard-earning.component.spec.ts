import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollConfigurationStandardEarningComponent } from './payroll-configuration-standard-earning.component';

describe('PayrollConfigurationStandardEarningComponent', () => {
  let component: PayrollConfigurationStandardEarningComponent;
  let fixture: ComponentFixture<PayrollConfigurationStandardEarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollConfigurationStandardEarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollConfigurationStandardEarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
