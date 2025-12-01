import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxUSWDSComponentLib } from './ngx-uswds-component-lib';

describe('NgxUSWDSComponentLib', () => {
  let component: NgxUSWDSComponentLib;
  let fixture: ComponentFixture<NgxUSWDSComponentLib>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxUSWDSComponentLib]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxUSWDSComponentLib);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
