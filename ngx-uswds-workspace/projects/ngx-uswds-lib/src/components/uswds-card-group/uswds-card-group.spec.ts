import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UswdsCardGroup } from './uswds-card-group';

describe('UswdsCardGroup', () => {
  let component: UswdsCardGroup;
  let fixture: ComponentFixture<UswdsCardGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UswdsCardGroup],
    }).compileComponents();

    fixture = TestBed.createComponent(UswdsCardGroup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a class of usa-card-group', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.classList.contains('usa-card-group'));
  });
});
