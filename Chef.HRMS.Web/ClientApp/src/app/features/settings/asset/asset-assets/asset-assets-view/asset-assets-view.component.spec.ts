import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetAssetsViewComponent } from './asset-assets-view.component';

describe('AssetAssetsViewComponent', () => {
  let component: AssetAssetsViewComponent;
  let fixture: ComponentFixture<AssetAssetsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetAssetsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetAssetsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
