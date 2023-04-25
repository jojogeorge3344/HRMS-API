import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetMetadataViewComponent } from './asset-metadata-view.component';

describe('AssetMetadataViewComponent', () => {
  let component: AssetMetadataViewComponent;
  let fixture: ComponentFixture<AssetMetadataViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetMetadataViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetMetadataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
