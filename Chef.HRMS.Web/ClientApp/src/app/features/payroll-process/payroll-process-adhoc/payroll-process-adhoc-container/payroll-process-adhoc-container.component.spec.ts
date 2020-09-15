import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollProcessAdhocContainerComponent } from './payroll-process-adhoc-container.component';

describe('PayrollProcessAdhocContainerComponent', () => {
  let component: PayrollProcessAdhocContainerComponent;
  let fixture: ComponentFixture<PayrollProcessAdhocContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollProcessAdhocContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollProcessAdhocContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
