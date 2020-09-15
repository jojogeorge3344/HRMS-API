import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayslipConfigurationComponent } from './payslip-configuration.component';

describe('PayslipConfigurationComponent', () => {
  let component: PayslipConfigurationComponent;
  let fixture: ComponentFixture<PayslipConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayslipConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayslipConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
