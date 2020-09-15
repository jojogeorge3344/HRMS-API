import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeEducationalDocumentsEditComponent } from './employee-educational-documents-edit.component';

describe('EmployeeEducationalDocumentsEditComponent', () => {
  let component: EmployeeEducationalDocumentsEditComponent;
  let fixture: ComponentFixture<EmployeeEducationalDocumentsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeEducationalDocumentsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeEducationalDocumentsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
