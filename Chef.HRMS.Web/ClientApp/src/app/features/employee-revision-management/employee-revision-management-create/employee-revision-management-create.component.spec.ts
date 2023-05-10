import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRevisionManagementCreateComponent } from './employee-revision-management-create.component';

describe('EmployeeRevisionManagementCreateComponent', () => {
  let component: EmployeeRevisionManagementCreateComponent;
  let fixture: ComponentFixture<EmployeeRevisionManagementCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeRevisionManagementCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeRevisionManagementCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
