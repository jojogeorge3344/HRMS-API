import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollProcessBonusCreateComponent } from './payroll-process-bonus-create.component';

describe('PayrollProcessBonusCreateComponent', () => {
  let component: PayrollProcessBonusCreateComponent;
  let fixture: ComponentFixture<PayrollProcessBonusCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollProcessBonusCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollProcessBonusCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
