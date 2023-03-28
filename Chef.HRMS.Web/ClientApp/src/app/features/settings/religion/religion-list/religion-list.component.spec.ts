import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReligionListComponent } from './religion-list.component';

describe('ReligionListComponent', () => {
  let component: ReligionListComponent;
  let fixture: ComponentFixture<ReligionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReligionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReligionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
