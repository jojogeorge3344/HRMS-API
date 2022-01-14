import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAssetAllocatedComponent } from './employee-asset-allocated.component';

describe('EmployeeAssetAllocatedComponent', () => {
  let component: EmployeeAssetAllocatedComponent;
  let fixture: ComponentFixture<EmployeeAssetAllocatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAssetAllocatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAssetAllocatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
