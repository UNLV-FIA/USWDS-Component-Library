import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UswdsTag } from './uswds-tag';

describe('UswdsTag', () => {
  let component: UswdsTag;
  let fixture: ComponentFixture<UswdsTag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UswdsTag],
    }).compileComponents();

    fixture = TestBed.createComponent(UswdsTag);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
