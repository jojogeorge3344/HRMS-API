import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveSlabViewComponent } from './leave-slab-view.component';

describe('LeaveSlabViewComponent', () => {
  let component: LeaveSlabViewComponent;
  let fixture: ComponentFixture<LeaveSlabViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveSlabViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveSlabViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
