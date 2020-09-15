import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveConfigurationEditComponent } from './leave-configuration-edit.component';

describe('LeaveConfigurationEditComponent', () => {
  let component: LeaveConfigurationEditComponent;
  let fixture: ComponentFixture<LeaveConfigurationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveConfigurationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveConfigurationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
