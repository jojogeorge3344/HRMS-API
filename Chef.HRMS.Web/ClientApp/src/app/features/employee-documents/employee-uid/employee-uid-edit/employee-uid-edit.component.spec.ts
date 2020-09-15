import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeUIDEditComponent } from './employee-uid-edit.component';

describe('EmployeeUIDEditComponent', () => {
  let component: EmployeeUIDEditComponent;
  let fixture: ComponentFixture<EmployeeUIDEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeUIDEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeUIDEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
