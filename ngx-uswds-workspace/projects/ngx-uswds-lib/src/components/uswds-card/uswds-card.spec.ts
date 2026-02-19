import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UswdsCard } from './uswds-card';

describe('UswdsCard', () => {
  let component: UswdsCard;
  let fixture: ComponentFixture<UswdsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UswdsCard],
    }).compileComponents();

    fixture = TestBed.createComponent(UswdsCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
