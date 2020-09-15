import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollConfigurationContainerComponent } from './payroll-configuration-container.component';

describe('PayrollConfigurationContainerComponent', () => {
  let component: PayrollConfigurationContainerComponent;
  let fixture: ComponentFixture<PayrollConfigurationContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollConfigurationContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollConfigurationContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
