import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UswdsFooter } from './uswds-footer';

describe('UswdsFooter', () => {
  let component: UswdsFooter;
  let fixture: ComponentFixture<UswdsFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UswdsFooter],
    }).compileComponents();

    fixture = TestBed.createComponent(UswdsFooter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
