import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollParameterDetailsListComponent } from './payroll-parameter-details-list.component';

describe('PayrollParameterDetailsListComponent', () => {
  let component: PayrollParameterDetailsListComponent;
  let fixture: ComponentFixture<PayrollParameterDetailsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollParameterDetailsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollParameterDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
