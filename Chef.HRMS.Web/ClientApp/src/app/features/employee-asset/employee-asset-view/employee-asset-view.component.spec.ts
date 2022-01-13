import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAssetViewComponent } from './employee-asset-view.component';

describe('EmployeeAssetViewComponent', () => {
  let component: EmployeeAssetViewComponent;
  let fixture: ComponentFixture<EmployeeAssetViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAssetViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAssetViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
