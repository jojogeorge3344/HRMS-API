import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EosSlabEditComponent } from './eos-slab-edit.component';

describe('EosSlabEditComponent', () => {
  let component: EosSlabEditComponent;
  let fixture: ComponentFixture<EosSlabEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EosSlabEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EosSlabEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
