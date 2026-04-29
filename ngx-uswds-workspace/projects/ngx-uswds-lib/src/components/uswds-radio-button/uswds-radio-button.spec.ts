import { Component, ViewChild, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UswdsRadioButton } from './uswds-radio-button';
import { UswdsRadioButtonItem } from '../uswds-radio-button-item/uswds-radio-button-item';

// Test Host Components

@Component({
  standalone: true,
  imports: [UswdsRadioButton, UswdsRadioButtonItem],
  template: `
    <ngx-uswds-radio-button [legend]="legend()" [name]="name" [idPrefix]="idPrefix">
      <ngx-uswds-radio-button-item
        label="Sojourner Truth"
        value="sojourner-truth"
        [checkedByDefault]="true"
      >
      </ngx-uswds-radio-button-item>
      <ngx-uswds-radio-button-item label="Frederick Douglass" value="frederick-douglass">
      </ngx-uswds-radio-button-item>
      <ngx-uswds-radio-button-item label="Booker T. Washington" value="booker-t-washington">
      </ngx-uswds-radio-button-item>
    </ngx-uswds-radio-button>
  `,
})
class ThreeItemHost {
  legend = signal('Select one historical figure');
  name = 'historical-figures';
  idPrefix?: string;
  @ViewChild(UswdsRadioButton) radio!: UswdsRadioButton;
}

@Component({
  standalone: true,
  imports: [UswdsRadioButton, UswdsRadioButtonItem],
  template: `
    <ngx-uswds-radio-button legend="Tile Group" name="tile-group" variant="tile" idPrefix="tile">
      <ngx-uswds-radio-button-item
        label="Daily"
        value="daily"
        [checkedByDefault]="true"
        description="Sent every day"
      >
      </ngx-uswds-radio-button-item>
      <ngx-uswds-radio-button-item label="Weekly" value="weekly" description="Sent once a week">
      </ngx-uswds-radio-button-item>
    </ngx-uswds-radio-button>
  `,
})
class TileHost {
  @ViewChild(UswdsRadioButton) radio!: UswdsRadioButton;
}

@Component({
  standalone: true,
  imports: [UswdsRadioButton],
  template: `<ngx-uswds-radio-button legend="Empty" name="empty"></ngx-uswds-radio-button>`,
})
class EmptyHost {
  @ViewChild(UswdsRadioButton) radio!: UswdsRadioButton;
}

// Helpers

function getInputs(nativeEl: HTMLElement): NodeListOf<HTMLInputElement> {
  return (nativeEl as HTMLElement).querySelectorAll<HTMLInputElement>('input[type="radio"]');
}

// Test Suite

describe('UswdsRadioButton', () => {
  describe('with three items (default config)', () => {
    let fixture: ComponentFixture<ThreeItemHost>;
    let host: ThreeItemHost;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ThreeItemHost],
      }).compileComponents();
      fixture = TestBed.createComponent(ThreeItemHost);
      host = fixture.componentInstance;
      host.idPrefix = 'hist';
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(host.radio).toBeTruthy();
    });

    describe('Default values', () => {
      it('should default variant to "default"', () => {
        expect(host.radio.variant()).toBe('default');
      });

      it('should discover three content children', () => {
        expect(host.radio.items().length).toBe(3);
      });
    });

    describe('DOM rendering', () => {
      it('should render a fieldset with usa-fieldset class', () => {
        expect(fixture.nativeElement.querySelector('fieldset.usa-fieldset')).toBeTruthy();
      });

      it('should render the legend text', () => {
        const legend = fixture.nativeElement.querySelector('legend.usa-legend');
        expect(legend?.textContent?.trim()).toBe('Select one historical figure');
      });

      it('should render the correct number of radio buttons', () => {
        expect(getInputs(fixture.nativeElement).length).toBe(3);
      });

      it('should render usa-radio wrappers for each item', () => {
        const wrappers = fixture.nativeElement.querySelectorAll('div.usa-radio');
        expect(wrappers.length).toBe(3);
      });

      it('should propagate the name to all inputs', () => {
        getInputs(fixture.nativeElement).forEach((input: HTMLInputElement) => {
          expect(input.name).toBe('historical-figures');
        });
      });
    });

    describe('Index assignment', () => {
      it('should assign sequential indices to all items after content init', () => {
        const items = host.radio.items();
        expect(items[0].index()).toBe(0);
        expect(items[1].index()).toBe(1);
        expect(items[2].index()).toBe(2);
      });
    });

    describe('ID generation', () => {
      it('should use provided idPrefix for all input IDs', () => {
        expect(getInputs(fixture.nativeElement)[0].id).toBe('hist-1');
        expect(getInputs(fixture.nativeElement)[1].id).toBe('hist-2');
        expect(getInputs(fixture.nativeElement)[2].id).toBe('hist-3');
      });

      it('should auto-generate unique idPrefixes when not provided', () => {
        const f1 = TestBed.createComponent(ThreeItemHost);
        f1.detectChanges();
        const prefix1 = f1.componentInstance.radio.resolvedIdPrefix();

        const f2 = TestBed.createComponent(ThreeItemHost);
        f2.detectChanges();
        const prefix2 = f2.componentInstance.radio.resolvedIdPrefix();

        expect(prefix1).toMatch(/^radio-button-\d+$/);
        expect(prefix2).toMatch(/^radio-button-\d+$/);
        expect(prefix1).not.toBe(prefix2);
      });
    });

    describe('Accessibility', () => {
      it('should use a fieldset to group the radio buttons', () => {
        expect(fixture.nativeElement.querySelector('fieldset')).toBeTruthy();
      });

      it('should use a legend inside the fieldset', () => {
        expect(fixture.nativeElement.querySelector('fieldset legend')).toBeTruthy();
      });

      it('should link each input id to its label for attribute', () => {
        const el = fixture.nativeElement as HTMLElement;
        const inputs = el.querySelectorAll<HTMLInputElement>('input[type="radio"]');
        inputs.forEach((input: HTMLInputElement) => {
          const label = el.querySelector(`label[for="${input.id}"]`);
          expect(label).toBeTruthy();
        });
      });
    });

    describe('Legend update', () => {
      it('should update the rendered legend when the legend input changes', () => {
        host.legend.set('Updated Legend');
        fixture.detectChanges();

        const legend = fixture.nativeElement.querySelector('legend.usa-legend');
        expect(legend?.textContent?.trim()).toBe('Updated Legend');
      });
    });
  });

  describe('Tile variant', () => {
    let fixture: ComponentFixture<TileHost>;
    let host: TileHost;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TileHost],
      }).compileComponents();
      fixture = TestBed.createComponent(TileHost);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should apply usa-radio__input--tile class to all inputs', () => {
      const tileInputs = fixture.nativeElement.querySelectorAll('input.usa-radio__input--tile');
      expect(tileInputs.length).toBe(2);
    });

    it('should render description spans when items have descriptions', () => {
      const descs = fixture.nativeElement.querySelectorAll('span.usa-checkbox__label-description');
      expect(descs.length).toBe(2);
    });

    it('should render the first item as checked', () => {
      expect(getInputs(fixture.nativeElement)[0].checked).toBe(true);
    });

    it('should expose variant as "tile"', () => {
      expect(host.radio.variant()).toBe('tile');
    });
  });

  describe('Empty radio group', () => {
    it('should render fieldset with no radio buttons when no items are projected', async () => {
      await TestBed.configureTestingModule({
        imports: [EmptyHost],
      }).compileComponents();
      const fixture = TestBed.createComponent(EmptyHost);
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('fieldset')).toBeTruthy();
      expect(getInputs(fixture.nativeElement).length).toBe(0);
    });

    it('should have zero items', async () => {
      await TestBed.configureTestingModule({
        imports: [EmptyHost],
      }).compileComponents();
      const fixture = TestBed.createComponent(EmptyHost);
      fixture.detectChanges();
      expect(fixture.componentInstance.radio.items().length).toBe(0);
    });
  });

  describe('getSelectedItem / getUnselectedItems', () => {
    let fixture: ComponentFixture<ThreeItemHost>;
    let host: ThreeItemHost;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ThreeItemHost],
      }).compileComponents();
      fixture = TestBed.createComponent(ThreeItemHost);
      host = fixture.componentInstance;
      host.idPrefix = 'sel';
      fixture.detectChanges();
    });

    it('should return the pre-selected item from getSelectedItem', () => {
      const selected = host.radio.getSelectedItem();
      expect(selected).not.toBeNull();
      expect(selected!.value()).toBe('sojourner-truth');
    });

    it('should return the remaining items in getUnselectedItems', () => {
      const unselected = host.radio.getUnselectedItems();
      expect(unselected.length).toBe(2);
    });

    it('should return null from getSelectedItem when no item is selected', async () => {
      await TestBed.configureTestingModule({
        imports: [EmptyHost],
      }).compileComponents();
      const emptyFixture = TestBed.createComponent(EmptyHost);
      emptyFixture.detectChanges();
      expect(emptyFixture.componentInstance.radio.getSelectedItem()).toBeNull();
    });

    it('should reflect a programmatic checked change', () => {
      const items = host.radio.items();
      items[0].checked = false;
      items[1].checked = true;

      expect(host.radio.getSelectedItem()?.value()).toBe('frederick-douglass');
      expect(host.radio.getUnselectedItems().length).toBe(2);
    });
  });
});
