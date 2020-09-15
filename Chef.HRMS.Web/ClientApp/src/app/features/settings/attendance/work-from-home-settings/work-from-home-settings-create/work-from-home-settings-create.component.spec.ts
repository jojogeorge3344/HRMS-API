import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFromHomeSettingsCreateComponent } from "./work-from-home-settings-create.component";

describe('WorkFromHomeSettingsCreateComponent', () => {
  let component: WorkFromHomeSettingsCreateComponent;
  let fixture: ComponentFixture<WorkFromHomeSettingsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkFromHomeSettingsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkFromHomeSettingsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
