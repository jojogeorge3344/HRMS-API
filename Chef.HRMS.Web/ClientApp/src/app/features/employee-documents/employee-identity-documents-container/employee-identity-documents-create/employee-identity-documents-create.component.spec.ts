import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeIdentityDocumentsCreateComponent } from './employee-identity-documents-create.component';

describe('EmployeeIdentityDocumentsCreateComponent', () => {
  let component: EmployeeIdentityDocumentsCreateComponent;
  let fixture: ComponentFixture<EmployeeIdentityDocumentsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeIdentityDocumentsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeIdentityDocumentsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
