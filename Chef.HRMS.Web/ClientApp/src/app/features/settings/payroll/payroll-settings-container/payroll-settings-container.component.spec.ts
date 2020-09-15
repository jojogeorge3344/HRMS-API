import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollSettingsContainerComponent } from './payroll-settings-container.component';

describe('PayrollSettingsContainerComponent', () => {
  let component: PayrollSettingsContainerComponent;
  let fixture: ComponentFixture<PayrollSettingsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollSettingsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollSettingsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
