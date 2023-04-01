import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeIdentityDocumentsEditComponent } from './employee-identity-documents-edit.component';

describe('EmployeeIdentityDocumentsEditComponent', () => {
  let component: EmployeeIdentityDocumentsEditComponent;
  let fixture: ComponentFixture<EmployeeIdentityDocumentsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeIdentityDocumentsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeIdentityDocumentsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
