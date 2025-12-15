import { ComponentFixture, TestBed } from '@angular/core/testing';
import { USWDSCard } from './component/ngx-uswds-component-card-lib';

describe('USWDSCard', () => {
  let component:USWDSCard;
  let fixture: ComponentFixture<USWDSCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [USWDSCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(USWDSCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
