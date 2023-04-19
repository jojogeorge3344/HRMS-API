import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimeSlabViewComponent } from './overtime-slab-view.component';

describe('OvertimeSlabViewComponent', () => {
  let component: OvertimeSlabViewComponent;
  let fixture: ComponentFixture<OvertimeSlabViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvertimeSlabViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvertimeSlabViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
