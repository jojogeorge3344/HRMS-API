import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveSettingsContainerComponent } from './leave-settings-container.component';

describe('LeaveSettingsContainerComponent', () => {
  let component: LeaveSettingsContainerComponent;
  let fixture: ComponentFixture<LeaveSettingsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveSettingsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveSettingsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
