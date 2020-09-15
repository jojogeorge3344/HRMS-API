import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFromHomeSettingsViewComponent } from './work-from-home-settings-view.component';

describe('WorkFromHomeSettingsViewComponent', () => {
  let component: WorkFromHomeSettingsViewComponent;
  let fixture: ComponentFixture<WorkFromHomeSettingsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkFromHomeSettingsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkFromHomeSettingsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
