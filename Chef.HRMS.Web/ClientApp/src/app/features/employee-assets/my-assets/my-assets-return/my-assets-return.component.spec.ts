import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAssetsReturnComponent } from './my-assets-return.component';

describe('MyAssetsReturnComponent', () => {
  let component: MyAssetsReturnComponent;
  let fixture: ComponentFixture<MyAssetsReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAssetsReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAssetsReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
