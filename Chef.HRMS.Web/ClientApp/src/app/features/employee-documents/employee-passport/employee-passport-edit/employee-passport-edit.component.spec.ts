import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePassportEditComponent } from './employee-passport-edit.component';

describe('EmployeePassportEditComponent', () => {
  let component: EmployeePassportEditComponent;
  let fixture: ComponentFixture<EmployeePassportEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeePassportEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePassportEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
