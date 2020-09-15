import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollConfigurationEditComponent } from './payroll-configuration-edit.component';

describe('PayrollConfigurationEditComponent', () => {
  let component: PayrollConfigurationEditComponent;
  let fixture: ComponentFixture<PayrollConfigurationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollConfigurationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollConfigurationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
