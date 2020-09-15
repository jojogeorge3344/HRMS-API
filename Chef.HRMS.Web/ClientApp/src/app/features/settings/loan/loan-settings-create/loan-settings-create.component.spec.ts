import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanSettingsCreateComponent } from './loan-settings-create.component';

describe('LoanSettingsCreateComponent', () => {
  let component: LoanSettingsCreateComponent;
  let fixture: ComponentFixture<LoanSettingsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanSettingsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanSettingsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
