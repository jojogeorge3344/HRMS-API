import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollProcessViewComponent } from './payroll-process-view.component';

describe('PayrollProcessViewComponent', () => {
  let component: PayrollProcessViewComponent;
  let fixture: ComponentFixture<PayrollProcessViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollProcessViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollProcessViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
