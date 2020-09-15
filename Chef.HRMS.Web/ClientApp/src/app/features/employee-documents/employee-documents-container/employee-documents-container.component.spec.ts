import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDocumentsContainerComponent } from './employee-documents-container.component';

describe('EmployeeDocumentsContainerComponent', () => {
  let component: EmployeeDocumentsContainerComponent;
  let fixture: ComponentFixture<EmployeeDocumentsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDocumentsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDocumentsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
