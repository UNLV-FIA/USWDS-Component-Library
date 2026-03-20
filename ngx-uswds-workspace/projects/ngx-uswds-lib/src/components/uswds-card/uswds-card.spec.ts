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

  it('should change to a media with header', () => {
    fixture.componentRef.setInput('mediaCardType', 'MediaWHeader');
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    const card = el.querySelector('.usa-card') as HTMLElement;

    expect(card).toBeTruthy();
    expect(card.classList.contains('usa-card--header-first')).toBeTruthy();
  });

  it('should change to a inset', () => {
    fixture.componentRef.setInput('mediaCardType', 'Inset');
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement.querySelector('.usa-card__container');
    const card = el.querySelector('.usa-card__media') as HTMLElement;

    expect(card).toBeTruthy();
    expect(card.classList.contains('usa-card__media--inset'));
  });

  it('should change to exdent', () => {
    fixture.componentRef.setInput('mediaCardType', 'Exdent');
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement.querySelector('.usa-card__container');
    const card = el.querySelector('.usa-card__media') as HTMLElement;

    expect(card).toBeTruthy();
    expect(card.classList.contains('usa-card__media--exdent'));
  });

  it('should change to a flag default', () => {
    fixture.componentRef.setInput('mediaCardType', 'FlagDefault');
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    const card = el.querySelector('.usa-card') as HTMLElement;

    expect(card).toBeTruthy();
    expect(card.classList.contains('usa-card--flag flex-1'));
  });

  it('should change to a flag right inset', () => {
    fixture.componentRef.setInput('mediaCardType', 'FlagRightInset');
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    const card = el.querySelector('.usa-card') as HTMLElement;

    expect(card).toBeTruthy();
    expect(card);
  });

  it('should check the default formatting case', () => {
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    const card = el.querySelector('.usa-card') as HTMLElement;

    expect(card).toBeTruthy();
    expect(card.classList.contains('usa-card__media'));
    expect(card.querySelector('.usa-card__body')).not.toBeNull();
  });
});
