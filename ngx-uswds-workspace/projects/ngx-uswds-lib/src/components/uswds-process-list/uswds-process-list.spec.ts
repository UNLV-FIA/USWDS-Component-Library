import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UswdsProcessList } from './uswds-process-list';

describe('UswdsProcessList', () => {
  let component: UswdsProcessList;
  let fixture: ComponentFixture<UswdsProcessList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UswdsProcessList],
    }).compileComponents();

    fixture = TestBed.createComponent(UswdsProcessList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
