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
    fixture.componentRef.setInput('variant', 'text');
    fixture.componentRef.setInput('inputId', 'input-type-text');

    await fixture.whenStable();
  });

  // Generic text input component tests (using single-line text input)
  describe('creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should default to no required attribute', () => {
      expect(component.required()).toBe(false);
    });

    it('should default to no disabled attribute', () => {
      expect(component.disabled()).toBe(false);
    });

    it('should render no hint at initialization', () => {
      expect(fixture.nativeElement.querySelector(`#${component.hintId()}`)).toBeNull();
    });

    it('should default to span for hint`s element', () => {
      expect(component.hintEl()).toBe('span');
    });
  });

  describe('label', () => {
    it('should have the correct class for the label', () => {
      fixture.componentRef.setInput('label', 'Default label');
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement.querySelector('label');
      expect(el?.classList.contains('usa-label')).toBeTruthy();
    });

    it('should render the label text', () => {
      fixture.componentRef.setInput('label', 'Text input label');
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement.querySelector('label');
      expect(el.textContent).toBe('Text input label');
    });

    it('should not render the label element if label is empty', () => {
      fixture.componentRef.setInput('label', '');
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('label')).toBeNull();
    });
  });

  describe('hint', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('hint', 'This is hint text.');
      fixture.detectChanges();
    });

    it('should render the span element by default', () => {
      const el: HTMLElement = fixture.nativeElement.querySelector('span');
      expect(el).not.toBeNull();
    });

    it('should render the span element when requested', () => {
      fixture.componentRef.setInput('hintEl', 'span');
      fixture.detectChanges();
      const el: HTMLSpanElement = fixture.nativeElement.querySelector(`#${component.hintId()}`);
      expect(el).not.toBeNull();
    });

    it('should render the div element when requested', () => {
      fixture.componentRef.setInput('hintEl', 'div');
      fixture.detectChanges();
      const el: HTMLSpanElement = fixture.nativeElement.querySelector(`#${component.hintId()}`);
      expect(el).not.toBeNull();
    });

    it('should render the hint text in span element', () => {
      const el: HTMLElement = fixture.nativeElement.querySelector(`#${component.hintId()}`);
      expect(el.textContent).toBe('This is hint text.');
    });

    it('should render the hint text in div element', () => {
      fixture.componentRef.setInput('hintEl', 'div');
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement.querySelector(`#${component.hintId()}`);
      expect(el.textContent).toBe('This is hint text.');
    });

    it('should not render the span element if hint is empty', () => {
      fixture.componentRef.setInput('hintEl', 'span');
      fixture.componentRef.setInput('hint', '');
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('span.usa-hint')).toBeNull();
    });

    it('should not render the div element if hint is empty', () => {
      fixture.componentRef.setInput('hintEl', 'div');
      fixture.componentRef.setInput('hint', '');
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('div.usa-hint')).toBeNull();
    });

    it('should have the correct id in span element', () => {
      const el: HTMLElement = fixture.nativeElement.querySelector('span');
      expect(el?.getAttribute('id')).toBe(`${component.inputId()}-hint`);
    });

    it('should have the correct id in div element', () => {
      fixture.componentRef.setInput('hintEl', 'div');
      fixture.detectChanges();
      const el: HTMLElement = fixture.nativeElement.querySelector('div');
      expect(el?.getAttribute('id')).toBe(`${component.inputId()}-hint`);
    });

    it('should have the correct class for the hint', () => {
      const el: HTMLElement = fixture.nativeElement.querySelector(`#${component.hintId()}`);
      expect(el?.classList.contains('usa-hint')).toBeTruthy();
    });
  });

  describe('input validation', () => {
    it('should throw an error if an empty input id is provided', () => {
      fixture = TestBed.createComponent(UswdsTextInput);
      fixture.componentRef.setInput('inputId', '');
      expect(() => {
        fixture.detectChanges();
      }).toThrowError('Propery "inputId" is required and cannot be an empty string');
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
      fixture.componentRef.setInput('label', 'Text input label');
      fixture.detectChanges();
      const labelFor: string = fixture.nativeElement.querySelector('label')?.getAttribute('for');
      const inputId: string = fixture.nativeElement.querySelector('input')?.getAttribute('id');
      expect(labelFor).toEqual(inputId);
    });

    it('should have identical values for the input`s id and name attributes', () => {
      const inputId: string = fixture.nativeElement.querySelector('input')?.getAttribute('id');
      const inputName: string = fixture.nativeElement.querySelector('input')?.getAttribute('name');
      expect(inputName).toEqual(inputId);
    });

    // Test text input's 'text's attributes
    describe('attributes', () => {
      it('should render no required attribute at initialization', () => {
        const el: HTMLElement = fixture.nativeElement.querySelector('input');
        expect(el?.hasAttribute('required')).toBe(false);
      });

      it('should render no disabled attribute at initialization', () => {
        const el: HTMLElement = fixture.nativeElement.querySelector('input');
        expect(el?.hasAttribute('disabled')).toBe(false);
      });

      it('should render no aria-disabled attribute at initialization', () => {
        const el: HTMLElement = fixture.nativeElement.querySelector('input');
        expect(el?.hasAttribute('aria-disabled')).toBe(false);
      });

      it('should render no aria-describedby attribute at initialization', () => {
        const el: HTMLElement = fixture.nativeElement.querySelector('input');
        expect(el?.hasAttribute('aria-describedby')).toBe(false);
      });

      it('should render no maxlength attribute at initialization', () => {
        const el: HTMLElement = fixture.nativeElement.querySelector('input');
        expect(el?.hasAttribute('maxlength')).toBe(false);
      });

      it('should render no type attribute at initialization', () => {
        const el: HTMLElement = fixture.nativeElement.querySelector('input');
        expect(el?.hasAttribute('type')).toBe(false);
      });

      it('should set required attribute when requested', () => {
        fixture.componentRef.setInput('required', 'true');
        fixture.detectChanges();
        const el: HTMLInputElement = fixture.nativeElement.querySelector('input');
        expect(el?.required).toBeTruthy();
      });

      it('should set disabled attribute when requested', () => {
        fixture.componentRef.setInput('disabled', 'true');
        fixture.detectChanges();
        const el: HTMLInputElement = fixture.nativeElement.querySelector('input');
        expect(el?.disabled).toBeTruthy();
      });

      it('should set aria-disabled to true when requested', () => {
        fixture.componentRef.setInput('disabled', 'true');
        fixture.detectChanges();
        const el: HTMLInputElement = fixture.nativeElement.querySelector('input');
        expect(el?.hasAttribute('aria-disabled')).toBeTruthy();
      });

      it('should add the hint in the aria-describedby attribute', () => {
        fixture.componentRef.setInput('hint', 'This is hint text.');
        fixture.detectChanges();
        const el: HTMLInputElement = fixture.nativeElement.querySelector('input');
        expect(el?.getAttribute('aria-describedby')).toContain(`${component.hintId()}`);
      });

      it('should add the externalDescribedBy in the aria-describedby attribute', () => {
        fixture.componentRef.setInput('externalDescribedBy', 'additional-id');
        fixture.detectChanges();
        const el: HTMLInputElement = fixture.nativeElement.querySelector('input');
        expect(el?.getAttribute('aria-describedby')).toContain('additional-id');
      });

      it('should add the maxlength attribute when requested', () => {
        fixture.componentRef.setInput('maxLen', 5);
        fixture.detectChanges();
        const el: HTMLInputElement = fixture.nativeElement.querySelector('input');
        expect(el?.getAttribute('maxlength')).toBe('5');
      });

      it('should add the character count class when there`s a maxlength', () => {
        fixture.componentRef.setInput('maxLen', 5);
        fixture.detectChanges();
        const el: HTMLInputElement = fixture.nativeElement.querySelector('input');
        expect(el?.classList.contains('usa-character-count__field')).toBeTruthy();
      });

      it('should change the input`s type attribute to email', () => {
        fixture.componentRef.setInput('type', 'email');
        fixture.detectChanges();
        const el: HTMLInputElement = fixture.nativeElement.querySelector('input');
        expect(el?.getAttribute('type')).toBe('email');
      });

      it('should change the input`s type attribute to number', () => {
        fixture.componentRef.setInput('type', 'number');
        fixture.detectChanges();
        const el: HTMLInputElement = fixture.nativeElement.querySelector('input');
        expect(el?.getAttribute('type')).toBe('number');
      });

      it('should change the input`s type attribute to password', () => {
        fixture.componentRef.setInput('type', 'password');
        fixture.detectChanges();
        const el: HTMLInputElement = fixture.nativeElement.querySelector('input');
        expect(el?.getAttribute('type')).toBe('password');
      });

      it('should change the input`s type attribute to search', () => {
        fixture.componentRef.setInput('type', 'search');
        fixture.detectChanges();
        const el: HTMLInputElement = fixture.nativeElement.querySelector('input');
        expect(el?.getAttribute('type')).toBe('search');
      });

      it('should change the input`s type attribute to tel', () => {
        fixture.componentRef.setInput('type', 'tel');
        fixture.detectChanges();
        const el: HTMLInputElement = fixture.nativeElement.querySelector('input');
        expect(el?.getAttribute('type')).toBe('tel');
      });
    });

    // Test text input 'text's widths
    describe('widths', () => {
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
    });

    // Test text input 'text's states
    describe('states', () => {
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
  });

  // Test text input's 'textarea' variant
  describe('text area variant', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('variant', 'textarea');
      fixture.componentRef.setInput('inputId', 'input-type-textarea');
      fixture.componentRef.setInput('label', 'Text area label');
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

    // Test text input's 'textarea's attributes
    describe('attributes', () => {
      it('should render no required attribute at initialization', () => {
        const el: HTMLElement = fixture.nativeElement.querySelector('textarea');
        expect(el?.hasAttribute('required')).toBe(false);
      });

      it('should render no disabled attribute at initialization', () => {
        const el: HTMLElement = fixture.nativeElement.querySelector('textarea');
        expect(el?.hasAttribute('disabled')).toBe(false);
      });

      it('should render no aria-disabled attribute at initialization', () => {
        const el: HTMLElement = fixture.nativeElement.querySelector('textarea');
        expect(el?.hasAttribute('aria-disabled')).toBe(false);
      });

      it('should render no aria-describedby attribute at initialization', () => {
        const el: HTMLElement = fixture.nativeElement.querySelector('textarea');
        expect(el?.hasAttribute('aria-describedby')).toBe(false);
      });

      it('should render no maxlength attribute at initialization', () => {
        const el: HTMLElement = fixture.nativeElement.querySelector('textarea');
        expect(el?.hasAttribute('maxlength')).toBe(false);
      });

      it('should set required attribute when requested', () => {
        fixture.componentRef.setInput('required', 'true');
        fixture.detectChanges();
        const el: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
        expect(el?.required).toBeTruthy();
      });

      it('should set disabled attribute when requested', () => {
        fixture.componentRef.setInput('disabled', 'true');
        fixture.detectChanges();
        const el: HTMLInputElement = fixture.nativeElement.querySelector('textarea');
        expect(el?.disabled).toBeTruthy();
      });

      it('should set aria-disabled to true when requested', () => {
        fixture.componentRef.setInput('disabled', 'true');
        fixture.detectChanges();
        const el: HTMLInputElement = fixture.nativeElement.querySelector('textarea');
        expect(el?.hasAttribute('aria-disabled')).toBeTruthy();
      });

      it('should add the hint in the aria-describedby attribute', () => {
        fixture.componentRef.setInput('hint', 'This is hint text.');
        fixture.detectChanges();
        const el: HTMLInputElement = fixture.nativeElement.querySelector('textarea');
        expect(el?.getAttribute('aria-describedby')).toContain(`${component.hintId()}`);
      });

      it('should add the externalDescribedBy in the aria-describedby attribute', () => {
        fixture.componentRef.setInput('externalDescribedBy', 'additional-id');
        fixture.detectChanges();
        const el: HTMLInputElement = fixture.nativeElement.querySelector('textarea');
        expect(el?.getAttribute('aria-describedby')).toContain('additional-id');
      });

      it('should add the maxlength attribute when requested', () => {
        fixture.componentRef.setInput('maxLen', 5);
        fixture.detectChanges();
        const el: HTMLInputElement = fixture.nativeElement.querySelector('textarea');
        expect(el?.getAttribute('maxlength')).toBe('5');
      });

      it('should add the character count class when there`s a maxlength', () => {
        fixture.componentRef.setInput('maxLen', 5);
        fixture.detectChanges();
        const el: HTMLInputElement = fixture.nativeElement.querySelector('textarea');
        expect(el?.classList.contains('usa-character-count__field')).toBeTruthy();
      });
    });

    // Test text input's 'textarea's widths
    describe('widths', () => {
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
    });

    // Test text input 'textarea's states
    describe('states', () => {
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
});
