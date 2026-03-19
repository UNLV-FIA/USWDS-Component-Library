import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UswdsCheckbox, CheckboxItem } from './uswds-checkbox';

const SAMPLE_ITEMS: CheckboxItem[] = [
  { id: 'check-truth', label: 'Sojourner Truth', value: 'sojourner-truth', checked: true },
  { id: 'check-douglass', label: 'Frederick Douglass', value: 'frederick-douglass' },
  { id: 'check-washington', label: 'Booker T. Washington', value: 'booker-t-washington' },
  {
    id: 'check-carver',
    label: 'George Washington Carver',
    value: 'george-washington-carver',
    disabled: true,
  },
];

const TILE_ITEMS: CheckboxItem[] = [
  {
    id: 'tile-truth',
    label: 'Sojourner Truth',
    value: 'sojourner-truth',
    checked: true,
    description: 'This is optional text that can describe the label in more detail.',
  },
  { id: 'tile-douglass', label: 'Frederick Douglass', value: 'frederick-douglass' },
];

describe('UswdsCheckbox', () => {
  let component: UswdsCheckbox;
  let fixture: ComponentFixture<UswdsCheckbox>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UswdsCheckbox],
    }).compileComponents();

    fixture = TestBed.createComponent(UswdsCheckbox);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
  });

  // Creation
  describe('creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have default variant of "default"', () => {
      expect(component.variant()).toBe('default');
    });

    it('should have empty legend by default', () => {
      expect(component.legend()).toBe('');
    });

    it('should have empty name by default', () => {
      expect(component.name()).toBe('');
    });

    it('should have empty items by default', () => {
      expect(component.items()).toEqual([]);
    });
  });

  // inputClasses
  describe('inputClasses', () => {
    it('should include usa-checkbox__input for default variant', () => {
      fixture.componentRef.setInput('variant', 'default');
      expect(component.inputClasses()).toContain('usa-checkbox__input');
    });

    it('should not include usa-checkbox__input--tile for default variant', () => {
      fixture.componentRef.setInput('variant', 'default');
      expect(component.inputClasses()).not.toContain('usa-checkbox__input--tile');
    });

    it('should include usa-checkbox__input--tile for tile variant', () => {
      fixture.componentRef.setInput('variant', 'tile');
      expect(component.inputClasses()).toContain('usa-checkbox__input');
      expect(component.inputClasses()).toContain('usa-checkbox__input--tile');
    });
  });

  // DOM rendering (default variant)
  describe('DOM rendering (default)', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('items', SAMPLE_ITEMS);
      fixture.componentRef.setInput('legend', 'Select any historical figure');
      fixture.componentRef.setInput('name', 'historical-figures');
      fixture.detectChanges();
    });

    it('should render a fieldset', () => {
      expect(el.querySelector('fieldset.usa-fieldset')).toBeTruthy();
    });

    it('should render the legend text', () => {
      const legend = el.querySelector('legend.usa-legend');
      expect(legend?.textContent?.trim()).toBe('Select any historical figure');
    });

    it('should render the correct number of checkboxes', () => {
      const checkboxes = el.querySelectorAll('input[type="checkbox"]');
      expect(checkboxes.length).toBe(4);
    });

    it('should render checkbox wrappers with usa-checkbox class', () => {
      const wrappers = el.querySelectorAll('div.usa-checkbox');
      expect(wrappers.length).toBe(4);
    });

    it('should render labels with correct text', () => {
      const labels = el.querySelectorAll('label.usa-checkbox__label');
      expect(labels[0]?.textContent?.trim()).toBe('Sojourner Truth');
      expect(labels[1]?.textContent?.trim()).toBe('Frederick Douglass');
    });

    it('should render the initially checked item as checked', () => {
      const firstInput = el.querySelector<HTMLInputElement>('#check-truth');
      expect(firstInput?.checked).toBe(true);
    });

    it('should render the unchecked items as unchecked', () => {
      const secondInput = el.querySelector<HTMLInputElement>('#check-douglass');
      expect(secondInput?.checked).toBe(false);
    });

    it('should render the disabled item as disabled', () => {
      const disabledInput = el.querySelector<HTMLInputElement>('#check-carver');
      expect(disabledInput?.disabled).toBe(true);
    });

    it('should apply usa-checkbox__input class to inputs', () => {
      const inputs = el.querySelectorAll('input.usa-checkbox__input');
      expect(inputs.length).toBe(4);
    });

    it('should not apply usa-checkbox__input--tile class in default variant', () => {
      const tileInputs = el.querySelectorAll('input.usa-checkbox__input--tile');
      expect(tileInputs.length).toBe(0);
    });
  });

  // DOM rendering (tile variant)
  describe('DOM rendering (tile)', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('items', TILE_ITEMS);
      fixture.componentRef.setInput('variant', 'tile');
      fixture.componentRef.setInput('legend', 'Select any historical figure');
      fixture.componentRef.setInput('name', 'historical-figures-tile');
      fixture.detectChanges();
    });

    it('should apply usa-checkbox__input--tile class to all inputs', () => {
      const tileInputs = el.querySelectorAll('input.usa-checkbox__input--tile');
      expect(tileInputs.length).toBe(2);
    });

    it('should render description span when item has a description', () => {
      const description = el.querySelector('span.usa-checkbox__label-description');
      expect(description).toBeTruthy();
      expect(description?.textContent?.trim()).toBe(
        'This is optional text that can describe the label in more detail.',
      );
    });

    it('should not render description span when item has no description', () => {
      const labels = el.querySelectorAll('label.usa-checkbox__label');
      const secondLabel = labels[1];
      expect(secondLabel.querySelector('span.usa-checkbox__label-description')).toBeFalsy();
    });
  });

  // Accessibility
  describe('accessibility', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('items', SAMPLE_ITEMS);
      fixture.detectChanges();
    });

    it('each input id should match its label for attribute', () => {
      const inputs = el.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
      inputs.forEach((input) => {
        const label = el.querySelector(`label[for="${input.id}"]`);
        expect(label).toBeTruthy();
      });
    });

    it('should use a fieldset to group the checkboxes', () => {
      expect(el.querySelector('fieldset')).toBeTruthy();
    });

    it('should use a legend inside the fieldset', () => {
      expect(el.querySelector('fieldset legend')).toBeTruthy();
    });
  });

  // Events
  describe('events', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('items', SAMPLE_ITEMS);
      fixture.detectChanges();
    });

    it('should emit checkedChange when a checkbox is toggled', () => {
      let emittedItems: CheckboxItem[] | undefined;
      component.checkedChange.subscribe((items) => (emittedItems = items));

      const input = el.querySelector<HTMLInputElement>('#check-douglass')!;
      input.checked = true;
      input.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      expect(emittedItems).toBeTruthy();
      expect(emittedItems?.length).toBe(4);
    });

    it('should emit the updated checked state for the toggled item', () => {
      let emittedItems: CheckboxItem[] | undefined;
      component.checkedChange.subscribe((items) => (emittedItems = items));

      const input = el.querySelector<HTMLInputElement>('#check-douglass')!;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      const douglassItem = emittedItems?.find((i) => i.id === 'check-douglass');
      expect(douglassItem?.checked).toBe(true);
    });

    it('should preserve other items checked states when one item changes', () => {
      let emittedItems: CheckboxItem[] | undefined;
      component.checkedChange.subscribe((items) => (emittedItems = items));

      const input = el.querySelector<HTMLInputElement>('#check-douglass')!;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      const truthItem = emittedItems?.find((i) => i.id === 'check-truth');
      expect(truthItem?.checked).toBe(true);
    });

    it('should update internalItems when a checkbox is toggled', () => {
      const input = el.querySelector<HTMLInputElement>('#check-douglass')!;
      input.checked = true;
      input.dispatchEvent(new Event('change'));

      const douglassItem = component.internalItems().find((i) => i.id === 'check-douglass');
      expect(douglassItem?.checked).toBe(true);
    });
  });

  // Edge cases
  describe('edge cases', () => {
    it('should render no checkboxes when items is empty', () => {
      fixture.componentRef.setInput('items', []);
      fixture.detectChanges();
      const inputs = el.querySelectorAll('input[type="checkbox"]');
      expect(inputs.length).toBe(0);
    });

    it('should sync internalItems when the items input changes', () => {
      fixture.componentRef.setInput('items', SAMPLE_ITEMS);
      fixture.detectChanges();
      expect(component.internalItems().length).toBe(4);

      fixture.componentRef.setInput('items', TILE_ITEMS);
      fixture.detectChanges();
      expect(component.internalItems().length).toBe(2);
    });

    it('should render name attribute on all inputs', () => {
      fixture.componentRef.setInput('items', SAMPLE_ITEMS);
      fixture.componentRef.setInput('name', 'test-group');
      fixture.detectChanges();

      const inputs = el.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
      inputs.forEach((input) => {
        expect(input.name).toBe('test-group');
      });
    });

    it('should render value attribute correctly on inputs', () => {
      fixture.componentRef.setInput('items', SAMPLE_ITEMS);
      fixture.detectChanges();

      const firstInput = el.querySelector<HTMLInputElement>('#check-truth');
      expect(firstInput?.value).toBe('sojourner-truth');
    });
  });
});
