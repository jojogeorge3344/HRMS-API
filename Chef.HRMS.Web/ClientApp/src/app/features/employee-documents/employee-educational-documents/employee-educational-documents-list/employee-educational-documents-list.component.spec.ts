import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeEducationalDocumentsListComponent } from './employee-educational-documents-list.component';

describe('EmployeeEducationalDocumentsListComponent', () => {
  let component: EmployeeEducationalDocumentsListComponent;
  let fixture: ComponentFixture<EmployeeEducationalDocumentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeEducationalDocumentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeEducationalDocumentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
