import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRevisionManagementViewComponent } from './employee-revision-management-view.component';

describe('EmployeeRevisionManagementViewComponent', () => {
  let component: EmployeeRevisionManagementViewComponent;
  let fixture: ComponentFixture<EmployeeRevisionManagementViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeRevisionManagementViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeRevisionManagementViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
