import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayCategoryEditComponent } from './holiday-category-edit.component';

describe('HolidayCategoryEditComponent', () => {
  let component: HolidayCategoryEditComponent;
  let fixture: ComponentFixture<HolidayCategoryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidayCategoryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
