import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRevisionManagementListComponent } from './employee-revision-management-list.component';

describe('EmployeeRevisionManagementListComponent', () => {
  let component: EmployeeRevisionManagementListComponent;
  let fixture: ComponentFixture<EmployeeRevisionManagementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeRevisionManagementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeRevisionManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
