import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollConfigurationReimbursableComponent } from './payroll-configuration-reimbursable.component';

describe('PayrollConfigurationReimbursableComponent', () => {
  let component: PayrollConfigurationReimbursableComponent;
  let fixture: ComponentFixture<PayrollConfigurationReimbursableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollConfigurationReimbursableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollConfigurationReimbursableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
