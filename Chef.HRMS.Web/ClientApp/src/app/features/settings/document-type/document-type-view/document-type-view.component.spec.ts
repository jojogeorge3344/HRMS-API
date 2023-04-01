import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTypeViewComponent } from './document-type-view.component';

describe('DocumentTypeViewComponent', () => {
  let component: DocumentTypeViewComponent;
  let fixture: ComponentFixture<DocumentTypeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentTypeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentTypeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
