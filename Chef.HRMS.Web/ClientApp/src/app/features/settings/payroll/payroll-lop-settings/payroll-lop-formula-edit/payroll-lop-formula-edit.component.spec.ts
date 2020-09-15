import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollLopFormulaEditComponent } from './payroll-lop-formula-edit.component';

describe('PayrollLopFormulaEditComponent', () => {
  let component: PayrollLopFormulaEditComponent;
  let fixture: ComponentFixture<PayrollLopFormulaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollLopFormulaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollLopFormulaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
