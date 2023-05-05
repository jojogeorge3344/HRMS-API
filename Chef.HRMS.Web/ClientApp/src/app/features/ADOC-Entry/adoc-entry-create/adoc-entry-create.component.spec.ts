import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdocEntryCreateComponent } from './adoc-entry-create.component';

describe('AdocEntryCreateComponent', () => {
  let component: AdocEntryCreateComponent;
  let fixture: ComponentFixture<AdocEntryCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdocEntryCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdocEntryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
