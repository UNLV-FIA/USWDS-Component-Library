import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UswdsAlert } from './ngx-uswds-component-alert-lib';

describe('NgxUswdsComponentAlertLib', () => {
  let component: UswdsAlert;
  let fixture: ComponentFixture<UswdsAlert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UswdsAlert]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UswdsAlert);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
