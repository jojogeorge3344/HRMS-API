import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanSettingsViewComponent } from './loan-settings-view.component';

describe('LoanSettingsViewComponent', () => {
  let component: LoanSettingsViewComponent;
  let fixture: ComponentFixture<LoanSettingsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanSettingsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanSettingsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
