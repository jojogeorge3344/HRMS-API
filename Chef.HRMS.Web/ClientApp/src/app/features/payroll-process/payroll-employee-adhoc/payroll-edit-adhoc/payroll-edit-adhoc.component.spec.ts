import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollEditAdhocComponent } from './payroll-edit-adhoc.component';

describe('PayrollEditAdhocComponent', () => {
  let component: PayrollEditAdhocComponent;
  let fixture: ComponentFixture<PayrollEditAdhocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollEditAdhocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollEditAdhocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
