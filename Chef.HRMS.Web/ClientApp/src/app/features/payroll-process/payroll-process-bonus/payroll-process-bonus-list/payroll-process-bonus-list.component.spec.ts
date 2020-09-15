import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollProcessBonusListComponent } from './payroll-process-bonus-list.component';

describe('PayrollProcessBonusListComponent', () => {
  let component: PayrollProcessBonusListComponent;
  let fixture: ComponentFixture<PayrollProcessBonusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollProcessBonusListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollProcessBonusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
