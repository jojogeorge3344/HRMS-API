import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAssetChangeComponent } from './employee-asset-change.component';

describe('EmployeeAssetChangeComponent', () => {
  let component: EmployeeAssetChangeComponent;
  let fixture: ComponentFixture<EmployeeAssetChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAssetChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAssetChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
