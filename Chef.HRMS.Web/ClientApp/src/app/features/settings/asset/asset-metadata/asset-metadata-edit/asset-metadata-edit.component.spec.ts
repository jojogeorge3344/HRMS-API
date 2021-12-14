import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetMetadataEditComponent } from './asset-metadata-edit.component';

describe('AssetMetadataEditComponent', () => {
  let component: AssetMetadataEditComponent;
  let fixture: ComponentFixture<AssetMetadataEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetMetadataEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetMetadataEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
