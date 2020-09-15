import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollComponentListComponent } from './payroll-component-list.component';

describe('PayrollComponentListComponent', () => {
  let component: PayrollComponentListComponent;
  let fixture: ComponentFixture<PayrollComponentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollComponentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollComponentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
