import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveConfigurationGeneralComponent } from './leave-configuration-general.component';

describe('LeaveConfigurationGeneralComponent', () => {
  let component: LeaveConfigurationGeneralComponent;
  let fixture: ComponentFixture<LeaveConfigurationGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveConfigurationGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveConfigurationGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
