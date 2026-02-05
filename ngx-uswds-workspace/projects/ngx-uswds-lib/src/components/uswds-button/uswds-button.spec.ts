import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UswdsButton } from './uswds-button';

describe('UswdsButton', () => {
  let component: UswdsButton;
  let fixture: ComponentFixture<UswdsButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UswdsButton],
    }).compileComponents();

    fixture = TestBed.createComponent(UswdsButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
