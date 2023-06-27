import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayslipComponentsViewComponent } from './payslip-components-view.component';

describe('PayslipComponentsViewComponent', () => {
  let component: PayslipComponentsViewComponent;
  let fixture: ComponentFixture<PayslipComponentsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayslipComponentsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayslipComponentsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
