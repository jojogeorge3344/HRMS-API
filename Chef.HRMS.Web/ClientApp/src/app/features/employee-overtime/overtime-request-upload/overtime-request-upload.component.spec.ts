import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimeRequestUploadComponent } from './overtime-request-upload.component';

describe('OvertimeRequestUploadComponent', () => {
  let component: OvertimeRequestUploadComponent;
  let fixture: ComponentFixture<OvertimeRequestUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvertimeRequestUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvertimeRequestUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
