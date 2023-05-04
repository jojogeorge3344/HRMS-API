import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdocEntryViewComponent } from './adoc-entry-view.component';

describe('AdocEntryViewComponent', () => {
  let component: AdocEntryViewComponent;
  let fixture: ComponentFixture<AdocEntryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdocEntryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdocEntryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
