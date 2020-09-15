import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollAdhocContainerComponent } from './payroll-adhoc-container.component';

describe('PayrollAdhocContainerComponent', () => {
  let component: PayrollAdhocContainerComponent;
  let fixture: ComponentFixture<PayrollAdhocContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollAdhocContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollAdhocContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
