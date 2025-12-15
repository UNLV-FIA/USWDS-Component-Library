import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UswdsButton } from './ngx-uswds-component-button-lib';

describe('UswdsButton', () => {
  let component: UswdsButton;
  let fixture: ComponentFixture<UswdsButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UswdsButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UswdsButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
