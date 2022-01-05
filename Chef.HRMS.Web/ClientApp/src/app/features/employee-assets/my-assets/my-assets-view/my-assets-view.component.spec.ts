import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAssetsViewComponent } from './my-assets-view.component';

describe('MyAssetsViewComponent', () => {
  let component: MyAssetsViewComponent;
  let fixture: ComponentFixture<MyAssetsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAssetsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAssetsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
