import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdocEntryEditComponent } from './adoc-entry-edit.component';

describe('AdocEntryEditComponent', () => {
  let component: AdocEntryEditComponent;
  let fixture: ComponentFixture<AdocEntryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdocEntryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdocEntryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
