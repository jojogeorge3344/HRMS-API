import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayslipComponentsCreateComponent } from './payslip-components-create.component';

describe('PayslipComponentsCreateComponent', () => {
  let component: PayslipComponentsCreateComponent;
  let fixture: ComponentFixture<PayslipComponentsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayslipComponentsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayslipComponentsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
