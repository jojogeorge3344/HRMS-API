import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimeSlabCreateComponent } from './overtime-slab-create.component';

describe('OvertimeSlabCreateComponent', () => {
  let component: OvertimeSlabCreateComponent;
  let fixture: ComponentFixture<OvertimeSlabCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvertimeSlabCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvertimeSlabCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
