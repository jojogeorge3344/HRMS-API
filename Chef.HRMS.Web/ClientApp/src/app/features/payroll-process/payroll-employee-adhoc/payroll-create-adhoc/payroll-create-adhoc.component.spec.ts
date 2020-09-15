import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollCreateAdhocComponent } from './payroll-create-adhoc.component';

describe('PayrollCreateAdhocComponent', () => {
  let component: PayrollCreateAdhocComponent;
  let fixture: ComponentFixture<PayrollCreateAdhocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollCreateAdhocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollCreateAdhocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
