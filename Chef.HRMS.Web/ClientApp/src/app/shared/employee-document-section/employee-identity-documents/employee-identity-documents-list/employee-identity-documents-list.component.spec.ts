import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { EmployeeIdentityDocumentsListComponent } from "./employee-identity-documents-list.component";

describe("EmployeeIdentityDocumentsContainerComponent", () => {
  let component: EmployeeIdentityDocumentsListComponent;
  let fixture: ComponentFixture<EmployeeIdentityDocumentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeIdentityDocumentsListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeIdentityDocumentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
