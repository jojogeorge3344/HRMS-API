import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAssetsChangeComponent } from './my-assets-change.component';

describe('MyAssetsChangeComponent', () => {
  let component: MyAssetsChangeComponent;
  let fixture: ComponentFixture<MyAssetsChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAssetsChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAssetsChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
