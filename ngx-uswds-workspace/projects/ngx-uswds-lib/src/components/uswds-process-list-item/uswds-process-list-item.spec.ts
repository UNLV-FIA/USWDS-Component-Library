import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UswdsProcessListItem } from './uswds-process-list-item';

describe('UswdsProcessListItem', () => {
  let component: UswdsProcessListItem;
  let fixture: ComponentFixture<UswdsProcessListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UswdsProcessListItem],
    }).compileComponents();

    fixture = TestBed.createComponent(UswdsProcessListItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
