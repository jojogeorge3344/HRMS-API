import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollEmployeeReviewComponent } from './payroll-employee-review.component';

describe('PayrollEmployeeReviewComponent', () => {
  let component: PayrollEmployeeReviewComponent;
  let fixture: ComponentFixture<PayrollEmployeeReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollEmployeeReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollEmployeeReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
