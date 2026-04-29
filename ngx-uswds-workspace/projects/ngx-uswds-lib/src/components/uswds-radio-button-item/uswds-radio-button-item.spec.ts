import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UswdsRadioButtonItem } from './uswds-radio-button-item';
import { UswdsRadioButton } from '../uswds-radio-button/uswds-radio-button';

// Test Host Components

@Component({
  standalone: true,
  imports: [UswdsRadioButton, UswdsRadioButtonItem],
  template: `
    <ngx-uswds-radio-button legend="Test Group" name="test-group" idPrefix="test">
      <ngx-uswds-radio-button-item label="Option A" value="option-a" [checkedByDefault]="true">
      </ngx-uswds-radio-button-item>
      <ngx-uswds-radio-button-item label="Option B" value="option-b"> </ngx-uswds-radio-button-item>
    </ngx-uswds-radio-button>
  `,
})
class TwoItemHost {
  @ViewChild(UswdsRadioButton) radio!: UswdsRadioButton;
}

@Component({
  standalone: true,
  imports: [UswdsRadioButton, UswdsRadioButtonItem],
  template: `
    <ngx-uswds-radio-button name="tile-group" variant="tile" idPrefix="tile">
      <ngx-uswds-radio-button-item
        label="Daily"
        value="daily"
        description="Receive updates every day"
      >
      </ngx-uswds-radio-button-item>
    </ngx-uswds-radio-button>
  `,
})
class TileHost {}

@Component({
  standalone: true,
  imports: [UswdsRadioButton, UswdsRadioButtonItem],
  template: `
    <ngx-uswds-radio-button name="disabled-group" idPrefix="dis">
      <ngx-uswds-radio-button-item label="Locked" value="locked" [disabled]="true">
      </ngx-uswds-radio-button-item>
    </ngx-uswds-radio-button>
  `,
})
class DisabledHost {}

@Component({
  standalone: true,
  imports: [UswdsRadioButton, UswdsRadioButtonItem],
  template: `
    <ngx-uswds-radio-button name="custom-id-group">
      <ngx-uswds-radio-button-item label="Custom" value="custom" id="my-custom-id">
      </ngx-uswds-radio-button-item>
    </ngx-uswds-radio-button>
  `,
})
class CustomIdHost {}

@Component({
  standalone: true,
  imports: [UswdsRadioButton, UswdsRadioButtonItem],
  template: `
    <ngx-uswds-radio-button name="event-group" idPrefix="evt">
      <ngx-uswds-radio-button-item label="Toggle Me" value="toggle"> </ngx-uswds-radio-button-item>
    </ngx-uswds-radio-button>
  `,
})
class EventHost {
  @ViewChild(UswdsRadioButtonItem) item!: UswdsRadioButtonItem;
}

// Helpers

function getInput(nativeEl: HTMLElement, index = 0): HTMLInputElement {
  return nativeEl.querySelectorAll<HTMLInputElement>('input[type="radio"]')[index];
}

function getLabel(nativeEl: HTMLElement, index = 0): HTMLLabelElement {
  return nativeEl.querySelectorAll<HTMLLabelElement>('label.usa-radio__label')[index];
}

// Test Suite

describe('UswdsRadioButtonItem', () => {
  describe('Default rendering', () => {
    let fixture: ComponentFixture<TwoItemHost>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TwoItemHost],
      }).compileComponents();
      fixture = TestBed.createComponent(TwoItemHost);
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(fixture.componentInstance).toBeTruthy();
    });

    it('should render a div.usa-radio wrapper', () => {
      const wrappers = fixture.nativeElement.querySelectorAll('div.usa-radio');
      expect(wrappers.length).toBe(2);
    });

    it('should render the label text', () => {
      expect(getLabel(fixture.nativeElement, 0).textContent?.trim()).toBe('Option A');
      expect(getLabel(fixture.nativeElement, 1).textContent?.trim()).toBe('Option B');
    });

    it('should render the value attribute on the input', () => {
      expect(getInput(fixture.nativeElement, 0).value).toBe('option-a');
      expect(getInput(fixture.nativeElement, 1).value).toBe('option-b');
    });

    it('should render the pre-selected item as checked', () => {
      expect(getInput(fixture.nativeElement, 0).checked).toBe(true);
    });

    it('should render the unselected item as unchecked', () => {
      expect(getInput(fixture.nativeElement, 1).checked).toBe(false);
    });

    it('should apply usa-radio__input class to inputs', () => {
      const inputs = fixture.nativeElement.querySelectorAll('input.usa-radio__input');
      expect(inputs.length).toBe(2);
    });

    it('should not apply tile class in default variant', () => {
      const tileInputs = fixture.nativeElement.querySelectorAll('input.usa-radio__input--tile');
      expect(tileInputs.length).toBe(0);
    });

    it('should set the name attribute from the radio button group', () => {
      const el = fixture.nativeElement as HTMLElement;
      const inputs = el.querySelectorAll<HTMLInputElement>('input[type="radio"]');
      inputs.forEach((input: HTMLInputElement) => {
        expect(input.name).toBe('test-group');
      });
    });

    it('should link each input id to its label for attribute', () => {
      const el = fixture.nativeElement as HTMLElement;
      const inputs = el.querySelectorAll<HTMLInputElement>('input[type="radio"]');
      inputs.forEach((input: HTMLInputElement) => {
        const label = el.querySelector(`label[for="${input.id}"]`);
        expect(label).toBeTruthy();
      });
    });

    it('should auto-generate ids from the radio button idPrefix', () => {
      expect(getInput(fixture.nativeElement, 0).id).toBe('test-1');
      expect(getInput(fixture.nativeElement, 1).id).toBe('test-2');
    });
  });

  describe('Tile variant', () => {
    let fixture: ComponentFixture<TileHost>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TileHost],
      }).compileComponents();
      fixture = TestBed.createComponent(TileHost);
      fixture.detectChanges();
    });

    it('should apply usa-radio__input--tile class', () => {
      expect(getInput(fixture.nativeElement).classList).toContain('usa-radio__input--tile');
    });

    it('should render the description span', () => {
      const desc = fixture.nativeElement.querySelector('span.usa-checkbox__label-description');
      expect(desc).toBeTruthy();
      expect(desc.textContent?.trim()).toBe('Receive updates every day');
    });
  });

  describe('Disabled state', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DisabledHost],
      }).compileComponents();
    });

    it('should render the input as disabled', () => {
      const fixture = TestBed.createComponent(DisabledHost);
      fixture.detectChanges();
      expect(getInput(fixture.nativeElement).disabled).toBe(true);
    });
  });

  describe('Custom id', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [CustomIdHost],
      }).compileComponents();
    });

    it('should use the provided id on the input', () => {
      const fixture = TestBed.createComponent(CustomIdHost);
      fixture.detectChanges();
      expect(getInput(fixture.nativeElement).id).toBe('my-custom-id');
    });

    it('should use the provided id on the label for attribute', () => {
      const fixture = TestBed.createComponent(CustomIdHost);
      fixture.detectChanges();
      const label = fixture.nativeElement.querySelector('label');
      expect(label?.getAttribute('for')).toBe('my-custom-id');
    });
  });

  describe('checked getter/setter and getInputElement()', () => {
    let fixture: ComponentFixture<EventHost>;
    let item: UswdsRadioButtonItem;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [EventHost],
      }).compileComponents();
      fixture = TestBed.createComponent(EventHost);
      fixture.detectChanges();
      item = fixture.componentInstance.item;
    });

    it('should return false from checked getter when unselected', () => {
      expect(item.checked).toBe(false);
    });

    it('should update the native input when the checked setter is called', () => {
      item.checked = true;
      expect(getInput(fixture.nativeElement).checked).toBe(true);
    });

    it('should reflect the updated state via the checked getter after setting', () => {
      item.checked = true;
      expect(item.checked).toBe(true);
    });

    it('should return the native HTMLInputElement from getInputElement()', () => {
      const nativeInput = item.getInputElement();
      expect(nativeInput).toBeInstanceOf(HTMLInputElement);
      expect(nativeInput.type).toBe('radio');
    });
  });

  describe('selectedChange output', () => {
    let fixture: ComponentFixture<EventHost>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [EventHost],
      }).compileComponents();
      fixture = TestBed.createComponent(EventHost);
      fixture.detectChanges();
    });

    it('should emit true when the radio button is selected', () => {
      let emitted: boolean | undefined;
      fixture.componentInstance.item.selectedChange.subscribe((v) => (emitted = v));

      const input = getInput(fixture.nativeElement);
      input.checked = true;
      input.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      expect(emitted).toBe(true);
    });

    it('should emit false when the radio button is deselected', () => {
      let emitted: boolean | undefined;
      fixture.componentInstance.item.selectedChange.subscribe((v) => (emitted = v));

      const input = getInput(fixture.nativeElement);
      input.checked = false;
      input.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      expect(emitted).toBe(false);
    });
  });

  describe('inputClasses', () => {
    it('should include usa-radio__input but not tile class for default variant', async () => {
      await TestBed.configureTestingModule({ imports: [TwoItemHost] }).compileComponents();
      const fixture = TestBed.createComponent(TwoItemHost);
      fixture.detectChanges();

      const items = fixture.componentInstance.radio.items();
      expect(items[0].inputClasses()).toContain('usa-radio__input');
      expect(items[0].inputClasses()).not.toContain('usa-radio__input--tile');
    });

    it('should include tile class for tile variant', async () => {
      await TestBed.configureTestingModule({ imports: [TileHost] }).compileComponents();
      const fixture = TestBed.createComponent(TileHost);
      fixture.detectChanges();

      const inputs = fixture.nativeElement.querySelectorAll('input.usa-radio__input--tile');
      expect(inputs.length).toBe(1);
    });
  });

  describe('no description', () => {
    it('should not render description span when description is not provided', async () => {
      await TestBed.configureTestingModule({ imports: [TwoItemHost] }).compileComponents();
      const fixture = TestBed.createComponent(TwoItemHost);
      fixture.detectChanges();

      const desc = fixture.nativeElement.querySelector('span.usa-checkbox__label-description');
      expect(desc).toBeFalsy();
    });
  });
});
