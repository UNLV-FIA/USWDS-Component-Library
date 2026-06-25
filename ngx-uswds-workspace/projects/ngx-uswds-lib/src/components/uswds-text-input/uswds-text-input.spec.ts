import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UswdsTextInput } from './uswds-text-input';

describe('UswdsTextInput', () => {
  let component: UswdsTextInput;
  let fixture: ComponentFixture<UswdsTextInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UswdsTextInput],
    }).compileComponents();

    fixture = TestBed.createComponent(UswdsTextInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
