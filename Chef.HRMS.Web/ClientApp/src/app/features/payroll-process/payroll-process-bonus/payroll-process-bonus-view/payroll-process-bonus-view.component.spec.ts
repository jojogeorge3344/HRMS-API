import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollProcessBonusViewComponent } from './payroll-process-bonus-view.component';

describe('PayrollProcessBonusViewComponent', () => {
  let component: PayrollProcessBonusViewComponent;
  let fixture: ComponentFixture<PayrollProcessBonusViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollProcessBonusViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollProcessBonusViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
