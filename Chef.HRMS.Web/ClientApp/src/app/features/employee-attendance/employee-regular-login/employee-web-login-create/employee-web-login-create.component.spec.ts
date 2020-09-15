import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeWebLoginCreateComponent } from './employee-web-login-create.component';

describe('EmployeeWebLoginCreateComponent', () => {
  let component: EmployeeWebLoginCreateComponent;
  let fixture: ComponentFixture<EmployeeWebLoginCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeWebLoginCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeWebLoginCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
