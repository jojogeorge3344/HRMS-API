import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveConfigurationRestrictionsComponent } from './leave-configuration-restrictions.component';

describe('LeaveConfigurationRestrictionsComponent', () => {
  let component: LeaveConfigurationRestrictionsComponent;
  let fixture: ComponentFixture<LeaveConfigurationRestrictionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveConfigurationRestrictionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveConfigurationRestrictionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
