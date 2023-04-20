import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetTypeViewComponent } from './asset-type-view.component';

describe('AssetTypeViewComponent', () => {
  let component: AssetTypeViewComponent;
  let fixture: ComponentFixture<AssetTypeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetTypeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetTypeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
