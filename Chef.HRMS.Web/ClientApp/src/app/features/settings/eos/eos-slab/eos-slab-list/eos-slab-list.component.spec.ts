import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EosSlabListComponent } from './eos-slab-list.component';

describe('EosSlabListComponent', () => {
  let component: EosSlabListComponent;
  let fixture: ComponentFixture<EosSlabListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EosSlabListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EosSlabListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
