import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdocEntryListComponent } from './adoc-entry-list.component';

describe('AdocEntryListComponent', () => {
  let component: AdocEntryListComponent;
  let fixture: ComponentFixture<AdocEntryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdocEntryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdocEntryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
