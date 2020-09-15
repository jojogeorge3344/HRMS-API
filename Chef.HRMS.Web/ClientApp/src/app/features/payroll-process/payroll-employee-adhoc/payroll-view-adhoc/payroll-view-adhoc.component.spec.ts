import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollViewAdhocComponent } from './payroll-view-adhoc.component';

describe('PayrollViewAdhocComponent', () => {
  let component: PayrollViewAdhocComponent;
  let fixture: ComponentFixture<PayrollViewAdhocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollViewAdhocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollViewAdhocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
