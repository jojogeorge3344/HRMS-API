import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBasicDetailsEditComponent } from './employee-basic-details-edit.component';

describe('EmployeeBasicDetailsEditComponent', () => {
  let component: EmployeeBasicDetailsEditComponent;
  let fixture: ComponentFixture<EmployeeBasicDetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeBasicDetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeBasicDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
