import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeJobTitleViewComponent } from './employee-job-title-view.component';

describe('EmployeeJobTitleViewComponent', () => {
  let component: EmployeeJobTitleViewComponent;
  let fixture: ComponentFixture<EmployeeJobTitleViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeJobTitleViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeJobTitleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
