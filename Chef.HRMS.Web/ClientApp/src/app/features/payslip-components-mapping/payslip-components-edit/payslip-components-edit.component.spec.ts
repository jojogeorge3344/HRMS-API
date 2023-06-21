import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayslipComponentsEditComponent } from './payslip-components-edit.component';

describe('PayslipComponentsEditComponent', () => {
  let component: PayslipComponentsEditComponent;
  let fixture: ComponentFixture<PayslipComponentsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayslipComponentsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayslipComponentsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
