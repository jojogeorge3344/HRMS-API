import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollCalculationEditComponent } from './payroll-calculation-edit.component';

describe('PayrollCalculationEditComponent', () => {
  let component: PayrollCalculationEditComponent;
  let fixture: ComponentFixture<PayrollCalculationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollCalculationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollCalculationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
