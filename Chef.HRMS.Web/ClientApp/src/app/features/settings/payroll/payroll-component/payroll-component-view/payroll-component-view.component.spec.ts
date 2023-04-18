import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollComponentViewComponent } from './payroll-component-view.component';

describe('PayrollComponentViewComponent', () => {
  let component: PayrollComponentViewComponent;
  let fixture: ComponentFixture<PayrollComponentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollComponentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollComponentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
