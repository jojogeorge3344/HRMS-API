import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveComponentEditComponent } from './leave-component-edit.component';

describe('LeaveComponentEditComponent', () => {
  let component: LeaveComponentEditComponent;
  let fixture: ComponentFixture<LeaveComponentEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveComponentEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveComponentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
