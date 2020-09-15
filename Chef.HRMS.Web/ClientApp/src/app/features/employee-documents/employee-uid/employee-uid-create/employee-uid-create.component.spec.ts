import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeUIDCreateComponent } from './employee-uid-create.component';

describe('EmployeeUIDCreateComponent', () => {
  let component: EmployeeUIDCreateComponent;
  let fixture: ComponentFixture<EmployeeUIDCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeUIDCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeUIDCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
