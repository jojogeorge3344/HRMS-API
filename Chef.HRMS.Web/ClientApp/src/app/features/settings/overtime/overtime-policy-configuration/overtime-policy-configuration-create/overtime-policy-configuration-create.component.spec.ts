import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimePolicyConfigurationCreateComponent } from './overtime-policy-configuration-create.component';

describe('OvertimePolicyConfigurationCreateComponent', () => {
  let component: OvertimePolicyConfigurationCreateComponent;
  let fixture: ComponentFixture<OvertimePolicyConfigurationCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvertimePolicyConfigurationCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvertimePolicyConfigurationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
