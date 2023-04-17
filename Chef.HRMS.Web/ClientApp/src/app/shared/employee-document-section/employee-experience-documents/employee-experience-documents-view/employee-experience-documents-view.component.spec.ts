import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeExperienceDocumentsViewComponent } from './employee-experience-documents-view.component';

describe('EmployeeExperienceDocumentsViewComponent', () => {
  let component: EmployeeExperienceDocumentsViewComponent;
  let fixture: ComponentFixture<EmployeeExperienceDocumentsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeExperienceDocumentsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeExperienceDocumentsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
