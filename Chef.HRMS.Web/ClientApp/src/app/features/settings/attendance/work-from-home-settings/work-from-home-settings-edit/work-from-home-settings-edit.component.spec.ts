import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFromHomeSettingsEditComponent } from './work-from-home-settings-edit.component';

describe('WorkFromHomeSettingsEditComponent', () => {
  let component: WorkFromHomeSettingsEditComponent;
  let fixture: ComponentFixture<WorkFromHomeSettingsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkFromHomeSettingsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkFromHomeSettingsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
