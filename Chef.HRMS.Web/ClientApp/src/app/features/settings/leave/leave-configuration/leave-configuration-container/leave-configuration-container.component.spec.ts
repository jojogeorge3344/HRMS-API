import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveConfigurationContainerComponent } from './leave-configuration-container.component';

describe('LeaveConfigurationContainerComponent', () => {
  let component: LeaveConfigurationContainerComponent;
  let fixture: ComponentFixture<LeaveConfigurationContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveConfigurationContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveConfigurationContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
