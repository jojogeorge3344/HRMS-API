import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveStructureEditComponent } from './leave-structure-edit.component';

describe('LeaveStructureEditComponent', () => {
  let component: LeaveStructureEditComponent;
  let fixture: ComponentFixture<LeaveStructureEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveStructureEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveStructureEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
