import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAssetRequestViewComponent } from './employee-asset-request-view.component';

describe('EmployeeAssetRequestViewComponent', () => {
  let component: EmployeeAssetRequestViewComponent;
  let fixture: ComponentFixture<EmployeeAssetRequestViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAssetRequestViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAssetRequestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
