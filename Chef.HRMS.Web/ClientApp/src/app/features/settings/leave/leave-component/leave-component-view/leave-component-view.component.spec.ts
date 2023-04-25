import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveComponentViewComponent } from './leave-component-view.component';

describe('LeaveComponentViewComponent', () => {
  let component: LeaveComponentViewComponent;
  let fixture: ComponentFixture<LeaveComponentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveComponentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveComponentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
