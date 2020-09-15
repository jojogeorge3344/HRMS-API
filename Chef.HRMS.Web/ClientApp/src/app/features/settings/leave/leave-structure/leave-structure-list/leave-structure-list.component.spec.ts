import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveStructureListComponent } from './leave-structure-list.component';

describe('LeaveStructureListComponent', () => {
  let component: LeaveStructureListComponent;
  let fixture: ComponentFixture<LeaveStructureListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveStructureListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveStructureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
