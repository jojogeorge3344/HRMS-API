import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollProcessLeaveListComponent } from './payroll-process-leave-list.component';

describe('PayrollProcessLeaveListComponent', () => {
  let component: PayrollProcessLeaveListComponent;
  let fixture: ComponentFixture<PayrollProcessLeaveListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollProcessLeaveListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollProcessLeaveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
