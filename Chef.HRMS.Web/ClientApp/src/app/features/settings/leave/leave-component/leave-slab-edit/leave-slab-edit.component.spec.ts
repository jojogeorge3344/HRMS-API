import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveSlabEditComponent } from './leave-slab-edit.component';

describe('LeaveSlabEditComponent', () => {
  let component: LeaveSlabEditComponent;
  let fixture: ComponentFixture<LeaveSlabEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveSlabEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveSlabEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
