import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetContainerComponent } from './asset-container.component';

describe('AssetContainerComponent', () => {
  let component: AssetContainerComponent;
  let fixture: ComponentFixture<AssetContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
