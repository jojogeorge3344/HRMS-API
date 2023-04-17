import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeEducationalDocumentsCreateComponent } from './employee-educational-documents-create.component';

describe('EmployeeEducationalDocumentsCreateComponent', () => {
  let component: EmployeeEducationalDocumentsCreateComponent;
  let fixture: ComponentFixture<EmployeeEducationalDocumentsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeEducationalDocumentsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeEducationalDocumentsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
