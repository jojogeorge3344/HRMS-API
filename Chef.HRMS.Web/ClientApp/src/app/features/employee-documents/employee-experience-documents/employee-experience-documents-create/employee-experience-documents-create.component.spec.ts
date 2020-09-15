import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeExperienceDocumentsCreateComponent } from './employee-experience-documents-create.component';

describe('EmployeeExperienceDocumentsCreateComponent', () => {
  let component: EmployeeExperienceDocumentsCreateComponent;
  let fixture: ComponentFixture<EmployeeExperienceDocumentsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeExperienceDocumentsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeExperienceDocumentsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
