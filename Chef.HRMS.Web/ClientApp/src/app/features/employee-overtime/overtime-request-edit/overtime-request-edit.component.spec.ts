import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimeRequestEditComponent } from './overtime-request-edit.component';

describe('OvertimeRequestEditComponent', () => {
  let component: OvertimeRequestEditComponent;
  let fixture: ComponentFixture<OvertimeRequestEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvertimeRequestEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvertimeRequestEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
