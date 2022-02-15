import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAssetAllocationComponent } from './employee-asset-allocation.component';

describe('EmployeeAssetAllocationComponent', () => {
  let component: EmployeeAssetAllocationComponent;
  let fixture: ComponentFixture<EmployeeAssetAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAssetAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAssetAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
