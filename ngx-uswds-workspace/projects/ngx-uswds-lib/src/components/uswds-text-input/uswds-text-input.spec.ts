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
    fixture.componentRef.setInput('inputID', 'input-type-text');

    await fixture.whenStable();
  });

  // Generic text input component tests (using single-line text input)
  describe('creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have the correct class for the label', () => {
      const el: HTMLElement = fixture.nativeElement.querySelector('label');
      expect(el?.classList.contains('usa-label')).toBeTruthy();
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

    it('should throw an error if an empty input id is provided', () => {
      fixture = TestBed.createComponent(UswdsTextInput);
      fixture.componentRef.setInput('inputID', '');
      fixture.componentRef.setInput('label', 'Text input label');
      expect(() => {
        fixture.detectChanges();
      }).toThrowError('Propery "inputID" is required and cannot be an empty string');
    });

    it('should throw an error if invalid width is provided', () => {
      fixture.componentRef.setInput('width', 'BADWIDTH');
      expect(() => {
        fixture.detectChanges();
      }).toThrowError(
        'Invalid text input width selected, valid widths are: [2xs, xs, sm or small, md or medium, lg, xl, 2xl]',
      );
    });

    it('should throw an error if invalid state is provided', () => {
      fixture.componentRef.setInput('state', 'BADSTATE');
      expect(() => {
        fixture.detectChanges();
      }).toThrowError('Invalid text input state selected, valid states are: [error, success]');
    });
  });

  // Test text input 'text' variant
  describe('text input variant', () => {
    it('should change the text input`s type to single-line when provided', () => {
      const el: HTMLElement = fixture.nativeElement.querySelector('input');
      expect(el?.classList.contains('usa-input')).toBeTruthy();
      expect(el?.classList.length).toBe(1);
    });

    it('should only render the input element and not the textarea element', () => {
      expect(fixture.nativeElement.querySelector('input')).not.toBeNull();
      expect(fixture.nativeElement.querySelector('textarea')).toBeNull();
    });

    it('should link the label`s for attribute to the input`s id attribute', () => {
      const labelFor: string = fixture.nativeElement.querySelector('label')?.getAttribute('for');
      const inputID: string = fixture.nativeElement.querySelector('input')?.getAttribute('id');
      expect(labelFor).toEqual(inputID);
    });

    it('should have identical values for the input`s id and name attributes', () => {
      const inputID: string = fixture.nativeElement.querySelector('input')?.getAttribute('id');
      const inputName: string = fixture.nativeElement.querySelector('input')?.getAttribute('name');
      expect(inputName).toEqual(inputID);
    });

    // Test text input 'text's widths
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

    // Test text input 'text's states
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
  });

  // Test text input's 'textarea' variant
  describe('text area variant', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('type', 'textarea');
      fixture.componentRef.setInput('inputID', 'input-type-textarea');
      fixture.detectChanges();
    });

    it('should change the text input`s type to multi-line when provided', () => {
      const el: HTMLElement = fixture.nativeElement.querySelector('textarea');
      expect(el?.classList.contains('usa-textarea')).toBeTruthy();
      expect(el?.classList.length).toBe(1);
    });

    it('should only render the textarea element and not the input element', () => {
      expect(fixture.nativeElement.querySelector('textarea')).not.toBeNull();
      expect(fixture.nativeElement.querySelector('input')).toBeNull();
    });

    it('should link the label`s for attribute to the textarea`s id attribute', () => {
      const labelFor: string = fixture.nativeElement.querySelector('label')?.getAttribute('for');
      const textAreaID: string = fixture.nativeElement
        .querySelector('textarea')
        ?.getAttribute('id');
      expect(labelFor).toEqual(textAreaID);
    });

    it('should have identical values for the textarea`s id and name attributes', () => {
      const textAreaID: string = fixture.nativeElement
        .querySelector('textarea')
        ?.getAttribute('id');
      const textAreaName: string = fixture.nativeElement
        .querySelector('textarea')
        ?.getAttribute('name');
      expect(textAreaName).toEqual(textAreaID);
    });

    // Test text input's 'textarea's widths
    it('should change the text area`s width to 2xs when provided', () => {
      fixture.componentRef.setInput('width', '2xs');
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement.querySelector('textarea');
      expect(el?.classList.contains('usa-input--2xs')).toBeTruthy();
    });

    it('should change the text area`s width to xs when provided', () => {
      fixture.componentRef.setInput('width', 'xs');
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement.querySelector('textarea');
      expect(el?.classList.contains('usa-input--xs')).toBeTruthy();
    });

    it('should change the text area`s width to small for "small"', () => {
      fixture.componentRef.setInput('width', 'small');
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement.querySelector('textarea');
      expect(el?.classList.contains('usa-input--small')).toBeTruthy();
    });

    it('should change the text area`s width to small for "sm"', () => {
      fixture.componentRef.setInput('width', 'sm');
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement.querySelector('textarea');
      expect(el?.classList.contains('usa-input--sm')).toBeTruthy();
    });

    it('should change the text area`s width to medium for "medium"', () => {
      fixture.componentRef.setInput('width', 'medium');
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement.querySelector('textarea');
      expect(el?.classList.contains('usa-input--medium')).toBeTruthy();
    });

    it('should change the text area`s width to medium for "md"', () => {
      fixture.componentRef.setInput('width', 'md');
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement.querySelector('textarea');
      expect(el?.classList.contains('usa-input--md')).toBeTruthy();
    });

    it('should change the text area`s width to lg when provided', () => {
      fixture.componentRef.setInput('width', 'lg');
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement.querySelector('textarea');
      expect(el?.classList.contains('usa-input--lg')).toBeTruthy();
    });

    it('should change the text area`s width to xl when provided', () => {
      fixture.componentRef.setInput('width', 'xl');
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement.querySelector('textarea');
      expect(el?.classList.contains('usa-input--xl')).toBeTruthy();
    });

    it('should change the text area`s width to 2xl when provided', () => {
      fixture.componentRef.setInput('width', '2xl');
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement.querySelector('textarea');
      expect(el?.classList.contains('usa-input--2xl')).toBeTruthy();
    });

    // Test text input 'textarea's states
    it('should change the text area`s state to error when provided', () => {
      fixture.componentRef.setInput('state', 'error');
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement.querySelector('textarea');
      expect(el?.classList.contains('usa-input--error')).toBeTruthy();
    });

    it('should change the text area`s state to success when provided', () => {
      fixture.componentRef.setInput('state', 'success');
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement.querySelector('textarea');
      expect(el?.classList.contains('usa-input--success')).toBeTruthy();
    });
  });
});
