import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollProcessMethodComponent } from './payroll-process-method.component';

describe('PayrollProcessMethodComponent', () => {
  let component: PayrollProcessMethodComponent;
  let fixture: ComponentFixture<PayrollProcessMethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollProcessMethodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollProcessMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
