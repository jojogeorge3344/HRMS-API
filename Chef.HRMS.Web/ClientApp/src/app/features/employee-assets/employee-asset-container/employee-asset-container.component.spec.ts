import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAssetContainerComponent } from './employee-asset-container.component';

describe('EmployeeAssetContainerComponent', () => {
  let component: EmployeeAssetContainerComponent;
  let fixture: ComponentFixture<EmployeeAssetContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAssetContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAssetContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
