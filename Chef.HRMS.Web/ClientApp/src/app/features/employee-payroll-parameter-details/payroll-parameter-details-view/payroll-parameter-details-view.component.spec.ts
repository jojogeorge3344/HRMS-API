import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollParameterDetailsViewComponent } from './payroll-parameter-details-view.component';

describe('PayrollParameterDetailsViewComponent', () => {
  let component: PayrollParameterDetailsViewComponent;
  let fixture: ComponentFixture<PayrollParameterDetailsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollParameterDetailsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollParameterDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
