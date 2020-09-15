import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeExperienceDocumentsListComponent } from './employee-experience-documents-list.component';

describe('EmployeeExperienceDocumentsListComponent', () => {
  let component: EmployeeExperienceDocumentsListComponent;
  let fixture: ComponentFixture<EmployeeExperienceDocumentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeExperienceDocumentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeExperienceDocumentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
