import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollParameterDetailsEditComponent } from './payroll-parameter-details-edit.component';

describe('PayrollParameterDetailsEditComponent', () => {
  let component: PayrollParameterDetailsEditComponent;
  let fixture: ComponentFixture<PayrollParameterDetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollParameterDetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollParameterDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
