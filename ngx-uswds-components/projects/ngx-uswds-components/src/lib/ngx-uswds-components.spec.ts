import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxUswdsComponents } from './ngx-uswds-components';

describe('NgxUswdsComponents', () => {
  let component: NgxUswdsComponents;
  let fixture: ComponentFixture<NgxUswdsComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxUswdsComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxUswdsComponents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
