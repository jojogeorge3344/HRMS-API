import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePassportCreateComponent } from './employee-passport-create.component';

describe('EmployeePassportCreateComponent', () => {
  let component: EmployeePassportCreateComponent;
  let fixture: ComponentFixture<EmployeePassportCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeePassportCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePassportCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
