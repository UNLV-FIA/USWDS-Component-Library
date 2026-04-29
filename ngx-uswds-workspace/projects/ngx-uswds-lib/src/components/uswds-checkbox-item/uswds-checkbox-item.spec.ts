import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UswdsCheckboxItem } from './uswds-checkbox-item';
import { UswdsCheckbox } from '../uswds-checkbox/uswds-checkbox';

// Test Host Components

@Component({
  standalone: true,
  imports: [UswdsCheckbox, UswdsCheckboxItem],
  template: `
    <ngx-uswds-checkbox legend="Test Group" name="test-group" idPrefix="test">
      <ngx-uswds-checkbox-item label="Option A" value="option-a" [checkedByDefault]="true">
      </ngx-uswds-checkbox-item>
      <ngx-uswds-checkbox-item label="Option B" value="option-b"> </ngx-uswds-checkbox-item>
    </ngx-uswds-checkbox>
  `,
})
class TwoItemHost {
  @ViewChild(UswdsCheckbox) checkbox!: UswdsCheckbox;
}

@Component({
  standalone: true,
  imports: [UswdsCheckbox, UswdsCheckboxItem],
  template: `
    <ngx-uswds-checkbox name="tile-group" variant="tile" idPrefix="tile">
      <ngx-uswds-checkbox-item label="Daily" value="daily" description="Receive updates every day">
      </ngx-uswds-checkbox-item>
    </ngx-uswds-checkbox>
  `,
})
class TileHost {}

@Component({
  standalone: true,
  imports: [UswdsCheckbox, UswdsCheckboxItem],
  template: `
    <ngx-uswds-checkbox name="disabled-group" idPrefix="dis">
      <ngx-uswds-checkbox-item label="Locked" value="locked" [disabled]="true">
      </ngx-uswds-checkbox-item>
    </ngx-uswds-checkbox>
  `,
})
class DisabledHost {}

@Component({
  standalone: true,
  imports: [UswdsCheckbox, UswdsCheckboxItem],
  template: `
    <ngx-uswds-checkbox name="custom-id-group">
      <ngx-uswds-checkbox-item label="Custom" value="custom" id="my-custom-id">
      </ngx-uswds-checkbox-item>
    </ngx-uswds-checkbox>
  `,
})
class CustomIdHost {}

@Component({
  standalone: true,
  imports: [UswdsCheckbox, UswdsCheckboxItem],
  template: `
    <ngx-uswds-checkbox name="event-group" idPrefix="evt">
      <ngx-uswds-checkbox-item label="Toggle Me" value="toggle"> </ngx-uswds-checkbox-item>
    </ngx-uswds-checkbox>
  `,
})
class EventHost {
  @ViewChild(UswdsCheckboxItem) item!: UswdsCheckboxItem;
}

// Helpers

function getInput(nativeEl: HTMLElement, index = 0): HTMLInputElement {
  return nativeEl.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')[index];
}

function getLabel(nativeEl: HTMLElement, index = 0): HTMLLabelElement {
  return nativeEl.querySelectorAll<HTMLLabelElement>('label.usa-checkbox__label')[index];
}

// Test Suite

describe('UswdsCheckboxItem', () => {
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

    it('should render a div.usa-checkbox wrapper', () => {
      const wrappers = fixture.nativeElement.querySelectorAll('div.usa-checkbox');
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

    it('should render the pre-checked item as checked', () => {
      expect(getInput(fixture.nativeElement, 0).checked).toBe(true);
    });

    it('should render the unchecked item as unchecked', () => {
      expect(getInput(fixture.nativeElement, 1).checked).toBe(false);
    });

    it('should apply usa-checkbox__input class to inputs', () => {
      const inputs = fixture.nativeElement.querySelectorAll('input.usa-checkbox__input');
      expect(inputs.length).toBe(2);
    });

    it('should not apply tile class in default variant', () => {
      const tileInputs = fixture.nativeElement.querySelectorAll('input.usa-checkbox__input--tile');
      expect(tileInputs.length).toBe(0);
    });

    it('should set the name attribute from the checkbox', () => {
      const el = fixture.nativeElement as HTMLElement;
      const inputs = el.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
      inputs.forEach((input: HTMLInputElement) => {
        expect(input.name).toBe('test-group');
      });
    });

    it('should link each input id to its label for attribute', () => {
      const el = fixture.nativeElement as HTMLElement;
      const inputs = el.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
      inputs.forEach((input: HTMLInputElement) => {
        const label = el.querySelector(`label[for="${input.id}"]`);
        expect(label).toBeTruthy();
      });
    });

    it('should auto-generate ids from the checkbox idPrefix', () => {
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

    it('should apply usa-checkbox__input--tile class', () => {
      expect(getInput(fixture.nativeElement).classList).toContain('usa-checkbox__input--tile');
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
    let item: UswdsCheckboxItem;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [EventHost],
      }).compileComponents();
      fixture = TestBed.createComponent(EventHost);
      fixture.detectChanges();
      item = fixture.componentInstance.item;
    });

    it('should return false from checked getter when unchecked', () => {
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
      expect(nativeInput.type).toBe('checkbox');
    });
  });

  describe('checkedChange output', () => {
    let fixture: ComponentFixture<EventHost>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [EventHost],
      }).compileComponents();
      fixture = TestBed.createComponent(EventHost);
      fixture.detectChanges();
    });

    it('should emit true when the checkbox is checked', () => {
      let emitted: boolean | undefined;
      fixture.componentInstance.item.checkedChange.subscribe((v) => (emitted = v));

      const input = getInput(fixture.nativeElement);
      input.checked = true;
      input.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      expect(emitted).toBe(true);
    });

    it('should emit false when the checkbox is unchecked', () => {
      let emitted: boolean | undefined;
      fixture.componentInstance.item.checkedChange.subscribe((v) => (emitted = v));

      const input = getInput(fixture.nativeElement);
      input.checked = false;
      input.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      expect(emitted).toBe(false);
    });
  });

  describe('inputClasses', () => {
    it('should include usa-checkbox__input but not tile class for default variant', async () => {
      await TestBed.configureTestingModule({ imports: [TwoItemHost] }).compileComponents();
      const fixture = TestBed.createComponent(TwoItemHost);
      fixture.detectChanges();

      const items = fixture.componentInstance.checkbox.items();
      expect(items[0].inputClasses()).toContain('usa-checkbox__input');
      expect(items[0].inputClasses()).not.toContain('usa-checkbox__input--tile');
    });

    it('should include tile class for tile variant', async () => {
      await TestBed.configureTestingModule({ imports: [TileHost] }).compileComponents();
      const fixture = TestBed.createComponent(TileHost);
      fixture.detectChanges();

      const inputs = fixture.nativeElement.querySelectorAll('input.usa-checkbox__input--tile');
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
