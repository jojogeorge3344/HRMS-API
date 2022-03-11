import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAssetRejectRevokeComponent } from './employee-asset-reject-revoke.component';

describe('EmployeeAssetRejectRevokeComponent', () => {
  let component: EmployeeAssetRejectRevokeComponent;
  let fixture: ComponentFixture<EmployeeAssetRejectRevokeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAssetRejectRevokeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAssetRejectRevokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
