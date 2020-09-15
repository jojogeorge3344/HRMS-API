import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveStructureCreateComponent } from './leave-structure-create.component';

describe('LeaveStructureCreateComponent', () => {
  let component: LeaveStructureCreateComponent;
  let fixture: ComponentFixture<LeaveStructureCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveStructureCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveStructureCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
