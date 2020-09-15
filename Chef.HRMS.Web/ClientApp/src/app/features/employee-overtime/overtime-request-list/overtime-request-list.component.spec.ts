import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimeRequestListComponent } from './overtime-request-list.component';

describe('OvertimeRequestListComponent', () => {
  let component: OvertimeRequestListComponent;
  let fixture: ComponentFixture<OvertimeRequestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvertimeRequestListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvertimeRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
