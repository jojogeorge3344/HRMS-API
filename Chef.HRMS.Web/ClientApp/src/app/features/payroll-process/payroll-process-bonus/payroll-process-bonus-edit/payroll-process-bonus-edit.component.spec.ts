import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollProcessBonusEditComponent } from './payroll-process-bonus-edit.component';

describe('PayrollProcessBonusEditComponent', () => {
  let component: PayrollProcessBonusEditComponent;
  let fixture: ComponentFixture<PayrollProcessBonusEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollProcessBonusEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollProcessBonusEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
