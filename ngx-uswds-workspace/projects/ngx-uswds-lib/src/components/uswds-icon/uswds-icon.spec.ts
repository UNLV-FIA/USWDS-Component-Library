import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UswdsIcon } from './uswds-icon';

describe('UswdsIcon', () => {
  let component: UswdsIcon;
  let fixture: ComponentFixture<UswdsIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UswdsIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(UswdsIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
