import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EosSlabCreateComponent } from './eos-slab-create.component';

describe('EosSlabCreateComponent', () => {
  let component: EosSlabCreateComponent;
  let fixture: ComponentFixture<EosSlabCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EosSlabCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EosSlabCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
