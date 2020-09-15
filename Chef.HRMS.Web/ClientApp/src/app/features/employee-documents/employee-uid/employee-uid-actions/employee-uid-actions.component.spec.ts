import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeUIDActionsComponent } from './employee-uid-actions.component';

describe('EmployeeUIDActionsComponent', () => {
  let component: EmployeeUIDActionsComponent;
  let fixture: ComponentFixture<EmployeeUIDActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeUIDActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeUIDActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
