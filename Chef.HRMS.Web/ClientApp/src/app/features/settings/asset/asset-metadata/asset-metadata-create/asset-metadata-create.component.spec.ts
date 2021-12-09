import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetMetadataCreateComponent } from './asset-metadata-create.component';

describe('AssetMetadataCreateComponent', () => {
  let component: AssetMetadataCreateComponent;
  let fixture: ComponentFixture<AssetMetadataCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetMetadataCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetMetadataCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
