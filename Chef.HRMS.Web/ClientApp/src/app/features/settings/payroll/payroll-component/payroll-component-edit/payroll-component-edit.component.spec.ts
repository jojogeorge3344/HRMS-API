import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollComponentEditComponent } from './payroll-component-edit.component';

describe('PayrollComponentEditComponent', () => {
  let component: PayrollComponentEditComponent;
  let fixture: ComponentFixture<PayrollComponentEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollComponentEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollComponentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
