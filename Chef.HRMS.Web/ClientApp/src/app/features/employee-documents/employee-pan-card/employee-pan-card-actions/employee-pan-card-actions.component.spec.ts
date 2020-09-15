import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePANCardActionsComponent } from './employee-pan-card-actions.component';

describe('EmployeePANCardActionsComponent', () => {
  let component: EmployeePANCardActionsComponent;
  let fixture: ComponentFixture<EmployeePANCardActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeePANCardActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePANCardActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
