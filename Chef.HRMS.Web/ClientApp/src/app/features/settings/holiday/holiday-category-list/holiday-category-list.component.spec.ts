import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayCategoryListComponent } from './holiday-category-list.component';

describe('HolidayCategoryListComponent', () => {
  let component: HolidayCategoryListComponent;
  let fixture: ComponentFixture<HolidayCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidayCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
