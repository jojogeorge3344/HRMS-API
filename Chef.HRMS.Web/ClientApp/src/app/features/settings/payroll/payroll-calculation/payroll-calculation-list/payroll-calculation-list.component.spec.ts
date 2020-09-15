import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollCalculationListComponent } from './payroll-calculation-list.component';

describe('PayrollCalculationListComponent', () => {
  let component: PayrollCalculationListComponent;
  let fixture: ComponentFixture<PayrollCalculationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollCalculationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollCalculationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
