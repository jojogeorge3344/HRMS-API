import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeOfficialDocumentsListComponent } from './employee-official-documents-list.component';

describe('EmployeeOfficialDocumentsListComponent', () => {
  let component: EmployeeOfficialDocumentsListComponent;
  let fixture: ComponentFixture<EmployeeOfficialDocumentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeOfficialDocumentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeOfficialDocumentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
