import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeEducationalDocumentsViewComponent } from './employee-educational-documents-view.component';

describe('EmployeeEducationalDocumentsViewComponent', () => {
  let component: EmployeeEducationalDocumentsViewComponent;
  let fixture: ComponentFixture<EmployeeEducationalDocumentsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeEducationalDocumentsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeEducationalDocumentsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
