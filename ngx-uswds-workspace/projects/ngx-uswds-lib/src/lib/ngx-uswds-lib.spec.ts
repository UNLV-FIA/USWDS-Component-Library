import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxUswdsLib } from './ngx-uswds-lib';

describe('NgxUswdsLib', () => {
  let component: NgxUswdsLib;
  let fixture: ComponentFixture<NgxUswdsLib>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxUswdsLib]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxUswdsLib);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
