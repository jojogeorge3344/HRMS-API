import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetAssetsEditComponent } from './asset-assets-edit.component';

describe('AssetAssetsEditComponent', () => {
  let component: AssetAssetsEditComponent;
  let fixture: ComponentFixture<AssetAssetsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetAssetsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetAssetsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
