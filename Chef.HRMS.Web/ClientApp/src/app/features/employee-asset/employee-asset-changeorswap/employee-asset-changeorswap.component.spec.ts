import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAssetChangeorswapComponent } from './employee-asset-changeorswap.component';

describe('EmployeeAssetChangeorswapComponent', () => {
  let component: EmployeeAssetChangeorswapComponent;
  let fixture: ComponentFixture<EmployeeAssetChangeorswapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAssetChangeorswapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAssetChangeorswapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
