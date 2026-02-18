import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UswdsButton } from './uswds-button';
import { vi } from 'vitest';
vi.hoisted(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // compatibility for older code
      removeListener: vi.fn(), // compatibility for older code
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

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
    fixture.componentRef.setInput('type', 'submit');
    fixture.componentRef.setInput('buttonStyle', 'Default');
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

  it('should have a type of button', () => {
    fixture.componentRef.setInput('type', 'button');
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.getAttribute('type')).toBe('button');
  });

  it('should have a type of reset', () => {
    fixture.componentRef.setInput('type', 'reset');
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.getAttribute('type')).toBe('reset');
  });

  // Now lets test the styles-css
  it('should change to the style Secondary', () => {
    fixture.componentRef.setInput('buttonStyle', 'Secondary');
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('.usa-button');
    expect(el.classList.contains('usa-button--secondary')).toBe(true);
  });

  it('should change to style accent-cool', () => {
    fixture.componentRef.setInput('buttonStyle', 'AccentCool');
    fixture.detectChanges();
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
    expect(el.getAttribute('aria-disabled')).toBeTruthy();
  });

  it('should change to focus when focused on', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    button.focus();
    fixture.detectChanges();
    expect(button.classList.contains('usa-focus'));
  });

  it('should change to hover when hovered on', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    button.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    expect(button.classList.contains('usa-button--hover'));
  });

  it('should change to active when active', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    button.dispatchEvent(new Event('mousedown'));
    fixture.detectChanges();
    expect(button.classList.contains('usa-button--active'));
  });

  // Tests to do
  // 1. Manual State Styles
  // 2. Button large or small style
  it('should change to a big button', () => {
    fixture.componentRef.setInput('bigButton', 'true');
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('.usa-button');
    expect(el.classList.contains('usa-button--big'));
  });
});

describe('ChkReqProps', () => {
  let fixture: ComponentFixture<UswdsButton>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UswdsButton],
    }).compileComponents();
  });

  it('should throw an error if a requiredProp of type and text is missing', () => {
    fixture = TestBed.createComponent(UswdsButton);
    expect(() => {
      fixture.detectChanges();
    }).toThrowError(/NG0950/);
  });

  it('should throw an error if an invalid type is provided', () => {
    fixture = TestBed.createComponent(UswdsButton);
    fixture.componentRef.setInput('type', 'BADTYPE');
    expect(() => {
      fixture.detectChanges();
    }).toThrowError('Invalid type selected, valid options are [submit, button, reset]');
  });

  it('should throw an error if an invalid prop of style is provided', () => {
    fixture = TestBed.createComponent(UswdsButton);
    fixture.componentRef.setInput('buttonStyle', 'BADSTYLE');
    fixture.componentRef.setInput('type', 'button');
    expect(() => {
      fixture.detectChanges();
    }).toThrowError(
      'Provided style does not exist, valid types are: [Secondary, AccentCool, Base, Outline, OutlineInverse, Unstyled]',
    );
  });
});

describe('ChkFunctionCallsOfAButton', () => {
  let component: UswdsButton;
  let fixture: ComponentFixture<UswdsButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UswdsButton],
    }).compileComponents();

    fixture = TestBed.createComponent(UswdsButton);
    // Provide Required props
    fixture.componentRef.setInput('type', 'submit');
    fixture.componentRef.setInput('buttonStyle', 'Default');
    component = fixture.componentInstance;
    fixture.detectChanges();

    await fixture.whenStable();
  });

  it('should log "hello" when button is clicked', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    const fn = vi.fn(() => console.log('Hello'));

    component.clicked.subscribe(fn);

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');

    button.click();
    expect(fn).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith('Hello');
    consoleSpy.mockRestore();
  });
});
