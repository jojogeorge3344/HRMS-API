import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollProcessOvertimeListComponent } from './payroll-process-overtime-list.component';

describe('PayrollProcessOvertimeListComponent', () => {
  let component: PayrollProcessOvertimeListComponent;
  let fixture: ComponentFixture<PayrollProcessOvertimeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollProcessOvertimeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollProcessOvertimeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
