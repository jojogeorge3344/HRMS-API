import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollLOPSettingsEditComponent } from './payroll-lop-settings-edit.component';

describe('PayrollLOPSettingsEditComponent', () => {
  let component: PayrollLOPSettingsEditComponent;
  let fixture: ComponentFixture<PayrollLOPSettingsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollLOPSettingsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollLOPSettingsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
