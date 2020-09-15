import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollConfigurationFixedComponent } from './payroll-configuration-fixed.component';

describe('PayrollConfigurationFixedComponent', () => {
  let component: PayrollConfigurationFixedComponent;
  let fixture: ComponentFixture<PayrollConfigurationFixedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollConfigurationFixedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollConfigurationFixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
