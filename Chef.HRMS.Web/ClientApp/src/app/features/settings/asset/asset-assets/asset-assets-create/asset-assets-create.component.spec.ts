import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetAssetsCreateComponent } from './asset-assets-create.component';

describe('AssetAssetsCreateComponent', () => {
  let component: AssetAssetsCreateComponent;
  let fixture: ComponentFixture<AssetAssetsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetAssetsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetAssetsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
