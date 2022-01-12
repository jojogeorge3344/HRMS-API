import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAssetRecallComponent } from './employee-asset-recall.component';

describe('EmployeeAssetRecallComponent', () => {
  let component: EmployeeAssetRecallComponent;
  let fixture: ComponentFixture<EmployeeAssetRecallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAssetRecallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAssetRecallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
