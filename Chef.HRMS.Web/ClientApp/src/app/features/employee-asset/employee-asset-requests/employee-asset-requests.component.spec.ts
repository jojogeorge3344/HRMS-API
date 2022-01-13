import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAssetRequestsComponent } from './employee-asset-requests.component';

describe('EmployeeAssetRequestsComponent', () => {
  let component: EmployeeAssetRequestsComponent;
  let fixture: ComponentFixture<EmployeeAssetRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAssetRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAssetRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
