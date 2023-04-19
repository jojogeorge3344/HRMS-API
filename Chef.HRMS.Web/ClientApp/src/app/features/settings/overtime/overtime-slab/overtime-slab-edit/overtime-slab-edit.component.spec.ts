import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimeSlabEditComponent } from './overtime-slab-edit.component';

describe('OvertimeSlabEditComponent', () => {
  let component: OvertimeSlabEditComponent;
  let fixture: ComponentFixture<OvertimeSlabEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvertimeSlabEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvertimeSlabEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
