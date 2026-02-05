import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UswdsTest2 } from './uswds-test-2';

describe('UswdsTest2', () => {
  let component: UswdsTest2;
  let fixture: ComponentFixture<UswdsTest2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UswdsTest2],
    }).compileComponents();

    fixture = TestBed.createComponent(UswdsTest2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
