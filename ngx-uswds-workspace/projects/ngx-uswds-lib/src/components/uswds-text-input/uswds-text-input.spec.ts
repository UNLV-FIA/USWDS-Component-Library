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

    // Provide required props
    fixture.componentRef.setInput('label', 'Default label');
    fixture.componentRef.setInput('type', 'text');

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test label creation
  it('should have the correct class for the label', () => {
    const el: HTMLElement = fixture.nativeElement.querySelector('label');
    expect(el?.classList.contains('usa-label')).toBeTruthy();
  });

  it('should have the correct text id for the label`s for attribute', () => {
    const el: HTMLElement = fixture.nativeElement.querySelector('label');
    expect(el?.getAttribute('for')).toBe('input-type-text');
  });

  it('should have the correct textarea id for the label`s for attribute', () => {
    fixture.componentRef.setInput('type', 'textarea');
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('label');
    expect(el?.getAttribute('for')).toBe('input-type-textarea');
  });

  it('should render the label text', () => {
    fixture.componentRef.setInput('label', 'Text input label');
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('label');
    expect(el.textContent).toBe('Text input label');
  });

  it('should throw an error if an empty label is provided', () => {
    fixture = TestBed.createComponent(UswdsTextInput);
    fixture.componentRef.setInput('label', '');
    expect(() => {
      fixture.detectChanges();
    }).toThrowError('Propery "label" is required and cannot be an empty string');
  });

  it('should link the input label`s for attribute to the input`s id attribute', () => {
    const labelFor: string = fixture.nativeElement.querySelector('label')?.getAttribute('for');
    const inputID: string = fixture.nativeElement.querySelector('input')?.getAttribute('id');
    expect(labelFor).toEqual(inputID);
  });

  it('should link the textarea label`s for attribute to the textarea`s id attribute', () => {
    fixture.componentRef.setInput('type', 'textarea');
    fixture.detectChanges();
    const labelFor: string = fixture.nativeElement.querySelector('label')?.getAttribute('for');
    const inputID: string = fixture.nativeElement.querySelector('textarea')?.getAttribute('id');
    expect(labelFor).toEqual(inputID);
  });

  it('should have the correct input id for the input`s name attribute', () => {
    const inputName: string = fixture.nativeElement.querySelector('input')?.getAttribute('name');
    expect(inputName).toEqual('input-type-text');
  });

  it('should have the correct textarea id for the textarea`s name attribute', () => {
    fixture.componentRef.setInput('type', 'textarea');
    fixture.detectChanges();
    const inputName: string = fixture.nativeElement.querySelector('textarea')?.getAttribute('name');
    expect(inputName).toEqual('input-type-textarea');
  });

  // Test CSS styling
  // Test text input's types
  it('should change the text input`s type to single-line when provided', () => {
    const el: HTMLElement = fixture.nativeElement.querySelector('input');
    expect(el?.classList.contains('usa-input')).toBeTruthy();
  });

  it('should change the text input`s type to multi-line when provided', () => {
    fixture.componentRef.setInput('type', 'textarea');
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('textarea');
    expect(el?.classList.contains('usa-textarea')).toBeTruthy();
  });

  it('should throw an error if invalid type is provided', () => {
    fixture.componentRef.setInput('type', 'BADTYPE');
    expect(() => {
      fixture.detectChanges();
    }).toThrowError('Invalid text input type selected, valid types are: [text, textarea]');
  });

  // Test text input's widths
  it('should change the text input`s width to 2xs when provided', () => {
    fixture.componentRef.setInput('width', '2xs');
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('input');
    expect(el?.classList.contains('usa-input--2xs')).toBeTruthy();
  });

  it('should change the text input`s width to xs when provided', () => {
    fixture.componentRef.setInput('width', 'xs');
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('input');
    expect(el?.classList.contains('usa-input--xs')).toBeTruthy();
  });

  it('should change the text input`s width to small for "small"', () => {
    fixture.componentRef.setInput('width', 'small');
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('input');
    expect(el?.classList.contains('usa-input--small')).toBeTruthy();
  });

  it('should change the text input`s width to small for "sm"', () => {
    fixture.componentRef.setInput('width', 'sm');
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('input');
    expect(el?.classList.contains('usa-input--sm')).toBeTruthy();
  });

  it('should change the text input`s width to medium for "medium"', () => {
    fixture.componentRef.setInput('width', 'medium');
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('input');
    expect(el?.classList.contains('usa-input--medium')).toBeTruthy();
  });

  it('should change the text input`s width to medium for "md"', () => {
    fixture.componentRef.setInput('width', 'md');
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('input');
    expect(el?.classList.contains('usa-input--md')).toBeTruthy();
  });

  it('should change the text input`s width to lg when provided', () => {
    fixture.componentRef.setInput('width', 'lg');
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('input');
    expect(el?.classList.contains('usa-input--lg')).toBeTruthy();
  });

  it('should change the text input`s width to xl when provided', () => {
    fixture.componentRef.setInput('width', 'xl');
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('input');
    expect(el?.classList.contains('usa-input--xl')).toBeTruthy();
  });

  it('should change the text input`s width to 2xl when provided', () => {
    fixture.componentRef.setInput('width', '2xl');
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('input');
    expect(el?.classList.contains('usa-input--2xl')).toBeTruthy();
  });

  it('should throw an error if invalid width is provided', () => {
    fixture.componentRef.setInput('width', 'BADWIDTH');
    expect(() => {
      fixture.detectChanges();
    }).toThrowError(
      'Invalid text input width selected, valid widths are: [2xs, xs, sm or small, md or medium, lg, xl, 2xl]',
    );
  });

  // Test text input's states
  it('should change the text input`s state to error when provided', () => {
    fixture.componentRef.setInput('state', 'error');
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('input');
    expect(el?.classList.contains('usa-input--error')).toBeTruthy();
  });

  it('should change the text input`s state to success when provided', () => {
    fixture.componentRef.setInput('state', 'success');
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('input');
    expect(el?.classList.contains('usa-input--success')).toBeTruthy();
  });

  it('should throw an error if invalid state is provided', () => {
    fixture.componentRef.setInput('state', 'BADSTATE');
    expect(() => {
      fixture.detectChanges();
    }).toThrowError('Invalid text input state selected, valid states are: [error, success]');
  });
});
