import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeJobTitleListComponent } from './employee-job-title-list.component';

describe('EmployeeJobTitleListComponent', () => {
  let component: EmployeeJobTitleListComponent;
  let fixture: ComponentFixture<EmployeeJobTitleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeJobTitleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeJobTitleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
