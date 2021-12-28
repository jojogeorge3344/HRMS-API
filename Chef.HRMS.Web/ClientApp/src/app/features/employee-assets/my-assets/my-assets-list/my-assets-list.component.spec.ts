import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAssetsListComponent } from './my-assets-list.component';

describe('MyAssetsListComponent', () => {
  let component: MyAssetsListComponent;
  let fixture: ComponentFixture<MyAssetsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAssetsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAssetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
