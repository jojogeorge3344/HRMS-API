import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetMetadataListComponent } from './asset-metadata-list.component';

describe('AssetMetadataListComponent', () => {
  let component: AssetMetadataListComponent;
  let fixture: ComponentFixture<AssetMetadataListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetMetadataListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetMetadataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
