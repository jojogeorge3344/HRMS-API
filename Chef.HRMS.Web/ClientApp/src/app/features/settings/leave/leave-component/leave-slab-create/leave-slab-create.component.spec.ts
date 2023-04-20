import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveSlabCreateComponent } from './leave-slab-create.component';

describe('LeaveSlabCreateComponent', () => {
  let component: LeaveSlabCreateComponent;
  let fixture: ComponentFixture<LeaveSlabCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveSlabCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveSlabCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
