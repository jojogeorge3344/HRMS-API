import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayCategoryCreateComponent } from './holiday-category-create.component';

describe('HolidayCategoryCreateComponent', () => {
  let component: HolidayCategoryCreateComponent;
  let fixture: ComponentFixture<HolidayCategoryCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidayCategoryCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayCategoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
