import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceSettingsContainerComponent } from './attendance-settings-container.component';

describe('AttendanceSettingsContainerComponent', () => {
  let component: AttendanceSettingsContainerComponent;
  let fixture: ComponentFixture<AttendanceSettingsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceSettingsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceSettingsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
