import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeIdentityDocumentsViewComponent } from './employee-identity-documents-view.component';

describe('EmployeeIdentityDocumentsViewComponent', () => {
  let component: EmployeeIdentityDocumentsViewComponent;
  let fixture: ComponentFixture<EmployeeIdentityDocumentsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeIdentityDocumentsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeIdentityDocumentsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
