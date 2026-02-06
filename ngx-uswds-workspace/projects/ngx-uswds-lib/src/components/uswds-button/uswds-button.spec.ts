import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UswdsButton } from './uswds-button';
import { button } from '@uswds/uswds/js';

describe('UswdsButton', () => {
  let component: UswdsButton;
  let fixture: ComponentFixture<UswdsButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UswdsButton],
    }).compileComponents();

    fixture = TestBed.createComponent(UswdsButton);
    component = fixture.componentInstance;

    // Provide Required props
    fixture.componentRef.setInput('text', 'Press Me Test');
    fixture.componentRef.setInput('type', 'submit');
    fixture.detectChanges();

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an type of submit', () => {
    const el: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(el.getAttribute('type')).toBe('submit');
  });

  it('should have text of Press Me Test', () => {
    const el: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(el.textContent?.trim()).toBe('Press Me Test');
  });

  // Now lets test the styles-css
  it('should change to the style Secondary', () => {
    fixture.componentRef.setInput('buttonStyle', 'Secondary');
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('.usa-button');
    expect(el.classList.contains('usa-button--secondary'));
  });

  it('should change to style accent-cool', () => {
    fixture.componentRef.setInput('buttonStyle', 'AccentCool');
    const el = fixture.nativeElement.querySelector('.usa-button');
    expect(el.classList.contains('usa-button--accent-cool'));
  });
  it('should change to style accent-warm', () => {
    fixture.componentRef.setInput('buttonStyle', 'AccentWarm');
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.usa-button');
    expect(el.classList.contains('usa-button--accent-warm'));
  });
  it('should change to style base', () => {
    fixture.componentRef.setInput('buttonStyle', 'Base');
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.usa-button');
    expect(el.classList.contains('usa-button--base'));
  });
  it('should change to style outline', () => {
    fixture.componentRef.setInput('buttonStyle', 'Outline');
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.usa-button');
    expect(el.classList.contains('usa-button--outline'));
  });
  it('should change to style outline-inverse', () => {
    fixture.componentRef.setInput('buttonStyle', 'OutlineInverse');
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.usa-button');
    expect(el.classList.contains('usa-button--inverse'));
  });
  it('should change to style unstyled', () => {
    fixture.componentRef.setInput('buttonStyle', 'Unstyled');
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.usa-button');
    expect(el.classList.contains('usa-button--unstyled'));
  });
  it('should change to disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const el: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(el.disabled).toBeTruthy();
  });

  it('should change to focus when focused on', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button'); 
    button.focus()
    fixture.detectChanges(); 
    expect(button.classList.contains('usa-focus'))
  })

  it('should change to hover when hovered on', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    button.dispatchEvent(new Event('mouseenter')); 
    fixture.detectChanges(); 
    expect(button.classList.contains('usa-button--hover'));
  })

  it('should change to active when active', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    button.dispatchEvent(new Event('mousedown')); 
    fixture.detectChanges();
    expect(button.classList.contains('usa-button--active'));
  })
});
