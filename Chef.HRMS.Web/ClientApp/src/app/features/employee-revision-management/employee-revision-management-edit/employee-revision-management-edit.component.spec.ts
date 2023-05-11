import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRevisionManagementEditComponent } from './employee-revision-management-edit.component';

describe('EmployeeRevisionManagementEditComponent', () => {
  let component: EmployeeRevisionManagementEditComponent;
  let fixture: ComponentFixture<EmployeeRevisionManagementEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeRevisionManagementEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeRevisionManagementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
