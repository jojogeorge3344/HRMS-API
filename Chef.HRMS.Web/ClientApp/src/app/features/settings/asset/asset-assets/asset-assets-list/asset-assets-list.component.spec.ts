import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetAssetsListComponent } from './asset-assets-list.component';

describe('AssetAssetsListComponent', () => {
  let component: AssetAssetsListComponent;
  let fixture: ComponentFixture<AssetAssetsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetAssetsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetAssetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
