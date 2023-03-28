import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReligionCreateComponent } from './religion-create.component';

describe('ReligionCreateComponent', () => {
  let component: ReligionCreateComponent;
  let fixture: ComponentFixture<ReligionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReligionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReligionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
