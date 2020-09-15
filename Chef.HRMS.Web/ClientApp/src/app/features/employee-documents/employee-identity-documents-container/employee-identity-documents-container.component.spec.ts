import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeIdentityDocumentsContainerComponent } from './employee-identity-documents-container.component';

describe('EmployeeIdentityDocumentsContainerComponent', () => {
  let component: EmployeeIdentityDocumentsContainerComponent;
  let fixture: ComponentFixture<EmployeeIdentityDocumentsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeIdentityDocumentsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeIdentityDocumentsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
