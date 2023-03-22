import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReligionViewComponent } from './religion-view.component';

describe('ReligionViewComponent', () => {
  let component: ReligionViewComponent;
  let fixture: ComponentFixture<ReligionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReligionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReligionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
