import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveComponentListComponent } from './leave-component-list.component';

describe('LeaveComponentListComponent', () => {
  let component: LeaveComponentListComponent;
  let fixture: ComponentFixture<LeaveComponentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveComponentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveComponentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
