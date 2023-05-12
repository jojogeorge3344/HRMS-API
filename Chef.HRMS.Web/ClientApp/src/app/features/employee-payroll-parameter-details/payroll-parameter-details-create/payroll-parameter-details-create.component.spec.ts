import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollParameterDetailsCreateComponent } from './payroll-parameter-details-create.component';

describe('PayrollParameterDetailsCreateComponent', () => {
  let component: PayrollParameterDetailsCreateComponent;
  let fixture: ComponentFixture<PayrollParameterDetailsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollParameterDetailsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollParameterDetailsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
