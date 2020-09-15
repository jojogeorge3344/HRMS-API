import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveComponentCreateComponent } from './leave-component-create.component';

describe('LeaveComponentCreateComponent', () => {
  let component: LeaveComponentCreateComponent;
  let fixture: ComponentFixture<LeaveComponentCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveComponentCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveComponentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
