import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveStructureAssignComponent } from './leave-structure-assign.component';

describe('LeaveStructureAssignComponent', () => {
  let component: LeaveStructureAssignComponent;
  let fixture: ComponentFixture<LeaveStructureAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveStructureAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveStructureAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
