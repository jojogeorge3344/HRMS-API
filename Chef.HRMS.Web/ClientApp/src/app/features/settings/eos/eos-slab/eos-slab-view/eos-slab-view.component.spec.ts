import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EosSlabViewComponent } from './eos-slab-view.component';

describe('EosSlabViewComponent', () => {
  let component: EosSlabViewComponent;
  let fixture: ComponentFixture<EosSlabViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EosSlabViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EosSlabViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
