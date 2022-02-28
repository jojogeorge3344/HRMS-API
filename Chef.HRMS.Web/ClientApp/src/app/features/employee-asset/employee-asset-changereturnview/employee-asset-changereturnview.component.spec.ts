import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAssetChangereturnviewComponent } from './employee-asset-changereturnview.component';

describe('EmployeeAssetChangereturnviewComponent', () => {
  let component: EmployeeAssetChangereturnviewComponent;
  let fixture: ComponentFixture<EmployeeAssetChangereturnviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAssetChangereturnviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAssetChangereturnviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
