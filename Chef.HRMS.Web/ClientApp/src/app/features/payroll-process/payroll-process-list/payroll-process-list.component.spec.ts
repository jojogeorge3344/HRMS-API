import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollProcessListComponent } from './payroll-process-list.component';

describe('PayrollProcessListComponent', () => {
  let component: PayrollProcessListComponent;
  let fixture: ComponentFixture<PayrollProcessListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollProcessListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollProcessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
