import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollProcessAdhocListComponent } from './payroll-process-adhoc-list.component';

describe('PayrollProcessAdhocListComponent', () => {
  let component: PayrollProcessAdhocListComponent;
  let fixture: ComponentFixture<PayrollProcessAdhocListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollProcessAdhocListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollProcessAdhocListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
