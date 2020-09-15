import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollProcessCompletedViewComponent } from './payroll-process-completed-view.component';

describe('PayrollProcessCompletedViewComponent', () => {
  let component: PayrollProcessCompletedViewComponent;
  let fixture: ComponentFixture<PayrollProcessCompletedViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollProcessCompletedViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollProcessCompletedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
