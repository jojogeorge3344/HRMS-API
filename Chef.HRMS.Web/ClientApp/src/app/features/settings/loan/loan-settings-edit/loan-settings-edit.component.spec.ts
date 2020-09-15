import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanSettingsEditComponent } from './loan-settings-edit.component';

describe('LoanSettingsEditComponent', () => {
  let component: LoanSettingsEditComponent;
  let fixture: ComponentFixture<LoanSettingsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanSettingsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanSettingsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
