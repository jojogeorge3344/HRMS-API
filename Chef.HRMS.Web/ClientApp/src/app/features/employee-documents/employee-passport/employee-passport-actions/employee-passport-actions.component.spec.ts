import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePassportActionsComponent } from './employee-passport-actions.component';

describe('EmployeePassportActionsComponent', () => {
  let component: EmployeePassportActionsComponent;
  let fixture: ComponentFixture<EmployeePassportActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeePassportActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePassportActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
