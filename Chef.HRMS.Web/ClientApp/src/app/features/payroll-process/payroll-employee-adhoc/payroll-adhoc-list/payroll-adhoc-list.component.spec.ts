import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollAdhocListComponent } from './payroll-adhoc-list.component';

describe('PayrollAdhocListComponent', () => {
  let component: PayrollAdhocListComponent;
  let fixture: ComponentFixture<PayrollAdhocListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollAdhocListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollAdhocListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
