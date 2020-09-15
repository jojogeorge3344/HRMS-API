import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollComponentCreateComponent } from './payroll-component-create.component';

describe('PayrollComponentCreateComponent', () => {
  let component: PayrollComponentCreateComponent;
  let fixture: ComponentFixture<PayrollComponentCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollComponentCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollComponentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
