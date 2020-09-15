import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimePolicyConfigurationEditComponent } from './overtime-policy-configuration-edit.component';

describe('OvertimePolicyConfigurationEditComponent', () => {
  let component: OvertimePolicyConfigurationEditComponent;
  let fixture: ComponentFixture<OvertimePolicyConfigurationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvertimePolicyConfigurationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvertimePolicyConfigurationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
