import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSettingsContainerComponent } from './employee-settings-container.component';

describe('EmployeeSettingsContainerComponent', () => {
  let component: EmployeeSettingsContainerComponent;
  let fixture: ComponentFixture<EmployeeSettingsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeSettingsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSettingsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
