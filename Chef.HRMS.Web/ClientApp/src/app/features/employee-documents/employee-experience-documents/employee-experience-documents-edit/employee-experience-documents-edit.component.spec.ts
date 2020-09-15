import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeExperienceDocumentsEditComponent } from './employee-experience-documents-edit.component';

describe('EmployeeExperienceDocumentsEditComponent', () => {
  let component: EmployeeExperienceDocumentsEditComponent;
  let fixture: ComponentFixture<EmployeeExperienceDocumentsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeExperienceDocumentsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeExperienceDocumentsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
